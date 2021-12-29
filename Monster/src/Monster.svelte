<script>
	export let monster;
	import { getEffectTitle } from './name.js';

	let debuffs = monster.debuffs
		.map(i => ({ value: i, label: getEffectTitle(i), }))
		.sort((a, b) => a.label.localeCompare(b.label));

	let skillTypes = monster.skillTypes.sort().reduce((all, i) => {
		all[i] = (all[i] || 0) + 1;
		return all;
	}, {});

	skillTypes = Object.keys(skillTypes).map(type => ({
		type: type,
		count: skillTypes[type],
	}))
	.sort((a, b) => {
		return b.count - a.count;
	});

	let bodyState = [
		['weak_to', '弱點'],
		['immune_to', '免疫'],
		['resistant_to', '抗性'],
	].map(p => {
		let value = monster.raw[p[0]];
		if (!value) { return null; }
		return {
			prop: p[0],
			name: p[1],
			value,
		}
	}).filter(Boolean);

	let skillProps = [
		['causes', '造成'],
		['element', '元素'],
		['type', '類別'],
		['gives', '附與'],
	];

	let skills = monster.allSkills.map(s => {
		let state = skillProps.map(p => {
			let value = s[p[0]];
			if (!value) { return null; }
			if (p[0] === 'causes') {
				value = value.map(getEffectTitle);
			}
			return {
				prop: p[0],
				name: p[1],
				value,
			};
		}).filter(Boolean);

		return {
			id: s.id,
			name: s.name,
			state,
		}
	})

	let pieChartOption = {
		type: 'outlabeledPie',
		data: {
			labels: skillTypes.map(i => i.type),
			datasets: [
				{
					data: skillTypes.map(i => i.count),
					backgroundColor: ['%23003f5c', '%232f4b7c', '%23665191', '%23a05195', '%23d45087', '%23f95d6a', '%23ff7c43', '%23ffa600',],
				}
			],
		},
		options: {
			plugins: {
				legend: false,
				outlabels: {
					text: encodeURIComponent('%l %v'),
					stretch: 35,
					font: {
						resizable: true,
						minSize: 12,
						maxSize: 18
					}
				}
			}
		}
	};
</script>

<section>
	<a href="https://orna.guide/monsters?show={monster.id}" target="guide">
		{monster.id} - {monster.name}
	</a>
	<div class="info">
		<div>
			<br />
			<br />
			<img
				class="avatar"
				src="https://playorna.com/static/img/{monster.img}"
				alt={monster.name}
				title={monster.name}
			/>

			<dl>
				{#each bodyState as point}
					<dt>{point.name}</dt>
					<dd>
						{#each point.value as _type}
							{_type}
							<br>
						{/each}
					</dd>
				{/each}
			</dl>
		</div>

		<ul>
			<li>
				Debuff:<hr>
			</li>
			{#each debuffs as debuff}
				<li>
					<label>
						<input type="checkbox" />
						{debuff.label}
						<a href="https://rplus.github.io/orna-lookup/?prevents={debuff.value}" target="ornagle">
							↗
						</a>
					</label>
				</li>
			{/each}
		</ul>
	</div>
	<img src="https://quickchart.io/chart?format=svg&w=350&c={JSON.stringify(pieChartOption)}" alt="" />

	<hr>
	<details open>
		<dl>

			{#each skills as skill}
				<dt>
					<a href="https://orna.guide/skills?show={skill.id}" target="guide">{skill.name}</a>
				</dt>
				<dd>
					{#each skill.state as _state}
						{_state.name}: {_state.value}
						<br>
					{/each}
				</dd>
			{/each}

		</dl>
	</details>

	<hr>

	<details>
		<summary>RAW DATA</summary>
		<pre>
			<details>
				<summary>monster</summary>{JSON.stringify(monster.raw, null, 2)}
			</details>
			<details>
				<summary>skills</summary>{JSON.stringify(monster.allSkills, null, 2)}
			</details>
		</pre>
	</details>
</section>

<style>
	img.avatar {
		width: 96px;
		aspect-ratio: 1;
		image-rendering: pixelated;
	}
	.info {
		display: flex;
		justify-content: center;
		gap: 1em;
		text-align: start;
	}
	dd ~ dt {
		margin-top: 0.5em;
	}
	li {
		list-style: none;
	}
	label a {
		margin-left: .5em;
	}
</style>
