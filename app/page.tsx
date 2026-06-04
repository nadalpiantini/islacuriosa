// Landing del primer visitante: la experiencia inmersiva de Isla Curiosa.
// La experiencia vive como un documento autónomo en /public/experiencia.html
// (Fuzzy videos + voz real + ambiente + mapa + waitlist). Se monta a pantalla
// completa para garantizar cero regresión frente a la versión aprobada.
export default function Home() {
  return (
    <iframe
      src="/experiencia.html"
      title="Isla Curiosa"
      allow="autoplay; fullscreen"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
    />
  )
}
