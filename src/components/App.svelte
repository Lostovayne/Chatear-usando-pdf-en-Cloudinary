<script>
  import { Alert } from "flowbite-svelte";
  import { APP_STATUS, appStatus } from "../store";
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>

{#if $appStatus === APP_STATUS.INIT}
  <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
  <Alert>
    <span class="font-medium">Algo malo ha pasado!</span>
    Change a few things up and try submitting again.
  </Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
  <StepChat />
{:else}
  <Alert>
    <span class="font-medium">Accion no reconocida</span>
    Este estado de la aplicación no se reconoce.
  </Alert>
{/if}
