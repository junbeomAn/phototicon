import PreventOverscroll from "@/ui/PreventOverscroll";
import EditorPanel from "./(components)/EditorPanel";

export default function Edit() {
  return (
    <main>
      <PreventOverscroll>
        <EditorPanel />
      </PreventOverscroll>
    </main>
  );
}
