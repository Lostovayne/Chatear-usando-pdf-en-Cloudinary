<script>
    import { appStatus } from "../store";
    import Dropzone from "svelte-file-dropzone";
  
    let files = {
      accepted: [],
      rejected: []
    };
  
    function handleFilesSelect(e) {
      const { acceptedFiles, fileRejections } = e.detail;
      files.accepted = [...files.accepted, ...acceptedFiles];
      files.rejected = [...files.rejected, ...fileRejections];
    }
  </script>
  
  <Dropzone on:drop={handleFilesSelect} />
  <ol>
    {#each files.accepted as item}
      <li>{item.name}</li>
    {/each}
  </ol>