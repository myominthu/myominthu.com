import Image from "next/image";
import { wroFinals, wroLabel, wroPhotos } from "@/lib/content";

// Justified rows: each photo's flex-grow is its aspect ratio,
// so every row has one shared height and fills the width.
export default function WroGallery() {
  const finalsWithPhotos = [...wroFinals]
    .reverse()
    .filter((f) => wroPhotos.some((p) => p.year === f.year));

  return (
    <div className="gallery">
      {finalsWithPhotos.map((f) => (
        <section key={f.year} className="gallery-group" aria-label={wroLabel(f)}>
          <h3 className="gallery-title">{wroLabel(f)}</h3>
          <div className="gallery-row">
            {wroPhotos
              .filter((p) => p.year === f.year)
              .map((p) => {
                const ar = p.width / p.height;
                return (
                  <figure
                    key={p.src}
                    className="gallery-item"
                    style={{ flexGrow: ar, flexBasis: `${ar * 220}px` }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(max-width: 700px) 100vw, 50vw"
                      style={{ aspectRatio: `${p.width} / ${p.height}` }}
                    />
                    <figcaption>{p.caption}</figcaption>
                  </figure>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
