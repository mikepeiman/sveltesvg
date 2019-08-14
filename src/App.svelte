<script>
  import Card from './components/card.svelte';
  import ManySVGs from './components/svg-element.svelte';
  import GradientSVG from './components/gradient-svg.svelte';
  import Palette from './pages/palette.svelte';
</script>

<style>
:global(body) {
  display: flex;
  flex-direction: column;
  height: auto;
}
	h1 {
		color: purple;
	}
</style>

<ManySVGs headline="Click inside here to generate a polygon" bg="rgba(255,55,0,1)" />
<GradientSVG />
<Card headline="This is a card component." />