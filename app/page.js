import Navbar from "@/components/Navbar";
import AppHeader from "@/components/AppHeader";
import SectionSimpleCounter from "@/components/SectionSimpleCounter";
import SectionIntro from "@/components/SectionIntro";
import SectionOpenAIChat from "@/components/SectionOpenAIChat";
import AppFooter from "@/components/AppFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <AppHeader
        title="認識 React States"
        description="state被更新，畫面就會被react重新渲染。"
      />
      {/* 簡單計數器 */}
      <SectionSimpleCounter />
      {/* 自我介紹產生器 */}
      <SectionIntro />
      {/* 與AI聊天 */}
      <SectionOpenAIChat />
      <AppFooter />
    </>
  );
}
