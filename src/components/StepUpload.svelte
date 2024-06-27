<script>
  import Dropzone from "svelte-file-dropzone";
  import { setAppStatusChatMode, setAppStatusLoading } from "../store";

  let files = {
    accepted: [],
    rejected: [],
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (files.accepted.length > 0) {
      setAppStatusLoading();
      // Subir el Archivo a Cloudinary como formData
      const formData = new FormData();
      formData.append("file", files.accepted[0]);
      // Subirlo a Cloudinary
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setAppStatusError();
        return;
      }

      const { id, url, pages } = await res.json();
      setAppStatusChatMode({ id, url, pages });
    }
  }
</script>

{#if files.accepted.length === 0}
  <Dropzone
    multiple={false}
    accept="application/pdf"
    on:drop={handleFilesSelect}>Arrastra aqui tu PDF</Dropzone
  >
{/if}

<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>
