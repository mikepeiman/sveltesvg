<script>
  import Card from './components/card.svelte';
  import Element from './components/svg-element.svelte';
</script>

<style>
:global(body) {
  display: flex;
  flex-direction: column;
}
	h1 {
		color: purple;
	}
</style>

<Card headline="This is a card component." />
<Card headline="No, this is!" />
<Element headline="Click inside here to set origin." bg="rgba(255,55,0,1)" />
