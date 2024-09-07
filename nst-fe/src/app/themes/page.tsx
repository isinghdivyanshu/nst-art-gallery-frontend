import Image from "next/image";
import placeholder from "@/../pictures/palceholder.jpg";

export default function Theme() {
  return (
    <section className="bg-dark text-light p-20">
      <div className="bg-[url('../assets/theme/bg.svg')] p-20">
        <div className="flex flex-col items-center bg-dark py-10 px-48">
          <h1 className="text-5xl text-skin mb-10">Theme of the Day</h1>
          <hr className="w-[8%]" />
          <h2 className="text-2xl my-5 tracking-widest">SURREALISM</h2>
          <hr className="w-[8%]" />
          <div className="flex gap-2 mt-10">
            <Image
              src={placeholder}
              width={500}
              height={1000}
              alt="placeholder image"
            />
            <Image
              src={placeholder}
              width={500}
              height={1000}
              alt="placeholder image"
            />
            <Image
              src={placeholder}
              width={500}
              height={1000}
              alt="placeholder image"
            />
            <Image
              src={placeholder}
              width={500}
              height={1000}
              alt="placeholder image"
            />
          </div>
          <p className="w-full px-48 mt-10">
            Surrealism is an art and cultural movement that developed in Europe
            in the aftermath of World War I in which artists aimed to allow
            the unconscious mind to express itself, often resulting in the
            depiction of illogical or dreamlike scenes and ideas.[1] Its
            intention was, according to leader André Breton, to &quot;resolve
            the previously contradictory conditions of dream and reality into an
            absolute reality, a super-reality&quot;, or surreality.
          </p>
          <p className="w-full px-48 mt-5">
            Learn more:{" "}
            <a
              href="https://www.wikipedia.com"
              target="_blank"
              className="text-blue-500"
            >
              https://www.wikipedia.com
            </a>
          </p>
          <h2 className="mt-32 text-4xl mb-5">The Persistence of Memory</h2>
          <div className="flex gap-5">
            <Image
              src={placeholder}
              width={800}
              height={1000}
              alt="placeholder image"
            />
            <Image
              src={placeholder}
              width={500}
              height={1000}
              alt="placeholder image"
            />
          </div>
          <p className="w-full p-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque,
            aperiam quos asperiores nihil dolor numquam esse voluptatum beatae
            ut reiciendis porro pariatur quibusdam maiores obcaecati est rem
            veniam animi. Nulla et cum provident quaerat iure ducimus incidunt
            eum quo optio blanditiis dignissimos voluptatum nisi, aspernatur qui
            culpa laborum cupiditate beatae numquam consectetur quidem
            distinctio nostrum vel. Suscipit, ipsa nam. Nihil nam et odio est
            mollitia, pariatur placeat sint error voluptatum neque earum maxime
            nulla eaque autem consequuntur! Libero ut voluptatibus excepturi
            dicta, cum id ipsam repudiandae? Placeat, nostrum quod! Placeat quos
            dolorum delectus repellendus quas. Saepe repudiandae, inventore
            dolore, cupiditate numquam illum laborum temporibus culpa, ad
            obcaecati nihil voluptatum exercitationem quis eos soluta debitis at
            voluptates consequatur incidunt sed. Perferendis dolorum possimus
            quod iusto inventore earum quae repellat veritatis rem aliquid
            quibusdam, consequatur quos fugiat voluptatem odit nulla officia
            totam qui libero quas mollitia voluptates. Fugit enim dolorum
            repellat!
          </p>
          <h2 className="mt-32 text-4xl mb-5">
            SOME OTHER WORKS OF SURREALISM
          </h2>
          <div className="w-full rounded bg-bg p-10 flex gap-10 items-center">
            <Image
              src={placeholder}
              width={600}
              height={1000}
              alt="placeholder image"
            />
            <div className="h-full flex flex-col justify-center">
              <p>FRIDA KAHLO</p>
              <p>Dutch, 1853 - 1890</p>
              <br />
              <p>
                Self-Portrait with Thorn Necklace and Hummingbird,{" "}
                <span> 1889</span>
              </p>
              <hr className="w-full my-5" />
            </div>
          </div>
          <div className="w-full rounded bg-bg p-10 flex flex-row-reverse my-5 gap-10 items-center">
            <Image
              src={placeholder}
              width={600}
              height={1000}
              alt="placeholder image"
            />
            <div className="h-full flex flex-col justify-center">
              <p>FRIDA KAHLO</p>
              <p>Dutch, 1853 - 1890</p>
              <br />
              <p>
                Self-Portrait with Thorn Necklace and Hummingbird,{" "}
                <span> 1889</span>
              </p>
              <hr className="w-full my-5" />
            </div>
          </div>
          <div className="w-full rounded bg-bg p-10 flex my-5 gap-10 items-center">
            <Image
              src={placeholder}
              width={600}
              height={1000}
              alt="placeholder image"
            />
            <div className="h-full flex flex-col justify-center">
              <p>FRIDA KAHLO</p>
              <p>Dutch, 1853 - 1890</p>
              <br />
              <p>
                Self-Portrait with Thorn Necklace and Hummingbird,{" "}
                <span> 1889</span>
              </p>
              <hr className="w-full my-5" />
            </div>
          </div>
          <h2 className="mt-10 text-4xl text-skin">OTHER THEMES</h2>
          <div className="flex flex-wrap p-20 gap-5 justify-center">
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
            <div className="flex flex-col">
              <Image
                src={placeholder}
                width={200}
                height={200}
                alt="placeholder image"
              />
              <p className="text-center text-2xl mt-3 text-skin font-bold">
                Abstract
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
