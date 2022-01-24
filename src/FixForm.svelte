<script>
  import { fixForm } from './stores.js';

  let options = $fixForm.props.sort();
  let fixProp;
  let fixValue;
  let placeholder;

  $: {
    if ($fixForm.item) {
      placeholder = $fixForm.item[fixProp];
      if (Array.isArray(placeholder)) {
        placeholder = JSON.stringify(placeholder);
      }
    }
  }

  function handleFormResponse() {
    let data = new URLSearchParams({
      'entry.113918685': $fixForm.item.id,
      'entry.1082592511': $fixForm.item.zh,
      'entry.1807665084': `${fixProp}: ${fixValue}`,
    }).toString();

    fetch(`https://docs.google.com/forms/d/e/1FAIpQLSe1u4EdX27HqFWXHXcCrhwxzPwVWVlHbDsb-Q5OFqhQzmNeJA/formResponse?&${data}&submit=SUBMIT`, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(() => {
        close();
      })
      .catch(() => {
        alert('GG');
      })
  }

  function close() {
    $fixForm.open = false;
    $fixForm.item = null;
    // fixProp = null;
    fixValue = null;
  }
</script>



<div
  class="dialog"
  hidden={!$fixForm.open}
>
  <div class="dialog__overlay" on:click={close} />
  <main class="dialog__content">
    {#if $fixForm.item}
      <form on:submit|preventDefault={handleFormResponse}>
        <fieldset>
          <legend>
            修正資料
          </legend>
          <strong>
            #{$fixForm.item.id} - {$fixForm.item.zh}
          </strong>
          <br>
          <select bind:value={fixProp}>
            {#each options as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
          <input
            type="text"
            placeholder={placeholder}
            bind:value={fixValue}
          />
          <input type="submit">
        </fieldset>
      </form>
    {/if}
  </main>
</div>
