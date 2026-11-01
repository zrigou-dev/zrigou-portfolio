import Footer from "@/components/Footer";
import GameArcade from "@/components/games/GameArcade";
import Header from "@/components/Header";

export const metadata = {
  title: "Mini Games",
  description: "Take a break with five browser games built in React: Memory Match, Tic Tac Toe, Rock Paper Scissors, Snake and a reaction test.",
  alternates: { canonical: "/games" },
  openGraph: { url: "/games", images: "/opengraph-image" },
  twitter: { card: "summary_large_image", images: "/opengraph-image" },
};

export default function GamesPage() {
  return (
    <>
      <Header />
      <main id="main" className="shell min-h-svh pb-20 pt-32 md:pt-40">
        <p className="eyebrow mb-4">Play</p>
        <h1 className="section-title">Five small games, for a five-minute break.</h1>
        <GameArcade />
      </main>
      <Footer />
    </>
  );
}
