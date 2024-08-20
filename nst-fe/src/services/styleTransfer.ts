import * as tf from '@tensorflow/tfjs-node';
import { promises as fs } from 'fs';

class StyleTransfer {
  // Private properties to hold the TensorFlow models.
  private styleNet: tf.GraphModel | null = null;
  private transformNet: tf.GraphModel | null = null;

  /**
   * Loads the style and transform models if they haven't been loaded already.
   * @param styleModelPath - The file path to the style model.
   * @param transformModelPath - The file path to the transform model.
   */
  async loadModels(styleModelPath: string, transformModelPath: string): Promise<void> {
    try {
      if (!this.styleNet || !this.transformNet) {
        // Load the models only if they are not already loaded.
        console.log('Loading models...');
        this.styleNet = await tf.loadGraphModel(`file://${styleModelPath}`);
        this.transformNet = await tf.loadGraphModel(`file://${transformModelPath}`);
        console.log('Models loaded successfully');
      }
    } catch (error) {
      console.error('Failed to load models:', error);
      throw new Error('Failed to load models');
    }
  }

  /**
   * Stylizes an image by applying the style from another image.
   * @param contentPath - The file path to the content image.
   * @param stylePath - The file path to the style image.
   * @param outputPath - The file path to save the stylized image.
   * @param styleRatio - Ratio of the style to be applied (default is 1.0, meaning full style).
   */
  async stylizeImage(contentPath: string, stylePath: string, outputPath: string, styleRatio: number = 1.0): Promise<void> {
    try {
      // Load the models if they are not loaded yet.
      await this.loadModels('src/models/saved_model_style_inception_js/model.json', 'src/models/saved_model_style_js/model.json');

      // Load the content and style images as tensors.
      const content = await this.loadImage(contentPath);
      const style = await this.loadImage(stylePath);

      // Perform the style transfer.
      const stylized = tf.tidy((): tf.Tensor => {
        const contentTensor = this.preprocessImage(content);
        const styleTensor = this.preprocessImage(style);

        // Get the bottleneck features from the style image using the style model.
        let bottleneck = this.styleNet!.predict(styleTensor) as tf.Tensor;

        // Optionally blend the style with the content's own identity (i.e., content preservation).
        if (styleRatio !== 1.0) {
          const identityBottleneck = this.styleNet!.predict(contentTensor) as tf.Tensor;
          bottleneck = this.interpolateBottleneck(identityBottleneck, bottleneck, styleRatio);
        }

        // Use the transform model to generate the stylized image by combining the content with the style bottleneck.
        return (this.transformNet!.predict([contentTensor, bottleneck]) as tf.Tensor[])[0].squeeze() as tf.Tensor;
      });

      // Save the stylized image to the specified output path.
      await this.saveImage(stylized, outputPath);
      
      // Dispose of tensors to free up memory.
      tf.dispose([content, style, stylized]);
    } catch (error) {
      console.error('Failed to stylize image:', error);
      throw new Error('Image stylization failed');
    }
  }

  /**
   * Loads an image from the given file path and decodes it into a Tensor.
   * @param imagePath - The file path to the image.
   * @returns A Tensor representing the loaded image.
   */
  private async loadImage(imagePath: string): Promise<tf.Tensor> {
    try {
      // Read the image file as a buffer.
      const imageBuffer = await fs.readFile(imagePath);

      // Decode the image buffer into a TensorFlow tensor.
      return tf.node.decodeImage(imageBuffer);
    } catch (error) {
      console.error('Failed to load image:', error);
      throw new Error('Failed to load image');
    }
  }

  /**
   * Preprocesses an image tensor for the model by normalizing pixel values and adding a batch dimension.
   * @param image - The image tensor to preprocess.
   * @returns The preprocessed image tensor.
   */
  private preprocessImage(image: tf.Tensor): tf.Tensor {
    return image.toFloat().div(tf.scalar(255)).expandDims();
  }

  /**
   * Interpolates between two bottleneck tensors based on a given ratio.
   * @param bottleneck1 - The first bottleneck tensor.
   * @param bottleneck2 - The second bottleneck tensor.
   * @param ratio - The interpolation ratio between the two bottlenecks.
   * @returns The interpolated bottleneck tensor.
   */
  private interpolateBottleneck(bottleneck1: tf.Tensor, bottleneck2: tf.Tensor, ratio: number): tf.Tensor {
    return tf.tidy(() => {
      // Scale the bottleneck tensors by the given ratio.
      const scaledBottleneck1 = bottleneck1.mul(tf.scalar(1 - ratio));
      const scaledBottleneck2 = bottleneck2.mul(tf.scalar(ratio));

      // Add the scaled tensors to create the interpolated result.
      return scaledBottleneck1.add(scaledBottleneck2);
    });
  }

  /**
   * Saves a Tensor as an image file to the specified output path.
   * @param tensor - The image tensor to save.
   * @param outputPath - The file path to save the image.
   */
  private async saveImage(tensor: tf.Tensor, outputPath: string): Promise<void> {
    try {
      // Normalize the tensor values to [0, 255] and cast to int32 for image encoding.
      const normalizedTensor = tensor.mul(255).cast('int32');

      // Encode the tensor as a JPEG image.
      const uint8Array = await tf.node.encodeJpeg(normalizedTensor as tf.Tensor3D);

      // Save the encoded image to the file system.
      await fs.writeFile(outputPath, uint8Array);
    } catch (error) {
      console.error('Failed to save image:', error);
      throw new Error('Failed to save image');
    }
  }
}

export default StyleTransfer;
