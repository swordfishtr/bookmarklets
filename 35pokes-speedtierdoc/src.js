javascript:void function(){try{
	// Header row
	const hcell = v => `<td style="border-left:solid #d6d6d6 0.6000000000000001pt;border-right:solid #d6d6d6 0.6000000000000001pt;border-bottom:solid #6363b0 1.2000000000000002pt;border-top:solid #d6d6d6 0.6000000000000001pt;vertical-align:top;background-color:#ebebf7;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;"><p dir="ltr" style="line-height:1.38;text-align: center;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11.5pt;font-family:Roboto,sans-serif;color:#141414;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">${v}</span></p></td>`;
	const hrow = vs => `<tr style="height:20.25pt">${vs.slice(0,8).map(v=>hcell(v)).join('')}</tr>`;

	// Normal row
	const cell = v => `<td style="border-left:solid #d6d6d6 0.6000000000000001pt;border-right:solid #d6d6d6 0.6000000000000001pt;border-bottom:solid #d6d6d6 0.6000000000000001pt;border-top:solid #d6d6d6 0.6000000000000001pt;vertical-align:top;background-color:#ffffff;padding:2pt 2pt 2pt 2pt;overflow:hidden;overflow-wrap:break-word;"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11.5pt;font-family:Roboto,sans-serif;color:#141414;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">${v}</span></p></td>`;
	const row = vs => `<tr style="height:20.25pt">${vs.slice(0,8).map(v=>cell(v)).join('')}</tr>`;

	// Takes value[][]; each value[] representing a row.
	const table = vs => `<meta charset="utf-8"><div dir="ltr" style="margin-left:0pt;" align="left" id="docs-internal-guid-d44bdb98-7fff-b2ef-37e5-094e5979e45a"><table style="border:none;border-collapse:collapse;"><colgroup><col width="84" /><col width="81" /><col width="126" /><col width="65" /><col width="110" /><col width="46" /><col width="52" /><col width="29" /></colgroup><tbody>${hrow(['Speed','Sprite','Pokemon','Base','Nature','IVs','EVs','±'])}${vs.map(v=>row(v)).join('')}</tbody></table></div>`;

	const sprite = p => `<span style="border:none;display:inline-block;overflow:hidden;width:40px;height:30px;"><img alt=":Drampa:" src="https://www.smogon.com/forums/media/minisprites/${p.spriteid}.png" width="40" height="30" style="margin-left:0px;margin-top:0px;" /></span>`;

	if (!app?.rooms?.teambuilder?.curTeam)
		throw new Error('Please navigate to a team in Pokemon Showdown. Make sure the team is for the correct format!');
	const tb = app.rooms.teambuilder;
	const t = tb.curTeam;
	const s = new DexSearch('pokemon',t.format).typedSearch;
	const vs = [];
	const addv = (p,n,iv,ev,mod) => vs.push([
		Math.trunc((1 + 0.5 * mod) * tb.getStat('spe',{species:p.id,ivs:{spe:iv}},ev,n===true?1.1:n===false?0.9:1)),
		sprite(p),
		p.name,
		p.baseStats.spe,
		n===true?'Positive':n===false?'Negative':'Neutral',
		iv,
		ev,
		mod>0?`+${mod}`:mod,
		p.num, // used for sorting
	]);
	let i = 600;
	const gen = async (input) => {
		if (!input) return app.addPopupMessage('Aborted');
		const roster = input.split(',').map(p=>t.dex.species.get(p));
		if (roster.some(p=>!p.exists)) return app.addPopupMessage(`Unknown Pokemon: ${roster.filter(p=>!p.exists).join(', ')}`);
		for (const p of roster) {
			if (
				['agility','autotomize','rockpolish','dragondance','rapidspin','scaleshot'].some(m=>s.canLearn(p.id,m)) ||
				Object.values(p.abilities).map(toID).some(a=>['unburden','swiftswim','chlorophyll','sandrush','slushrush'].includes(a))
			) {
				addv(p,true,31,252,2);
				addv(p,null,31,252,2);
			}
			addv(p,true,31,252,1);
			addv(p,null,31,252,1);
			addv(p,true,31,252,0);
			addv(p,null,31,252,0);
			addv(p,null,31,0,0);
			if (p.baseStats.spe<=60 && Math.min(...Object.values(p.baseStats))===p.baseStats.spe) {
				addv(p,false,0,0,0);
			}
		}
		vs.sort((a,b)=>a[0]-b[0]||a[8]-b[8]).reverse();
		next();
	};
	const next = () => {
		let c = [];
		while (!c.length && i >= 0) {
			c = vs.filter(v=>v[0]>=i&&(i===600||v[0]<i+100));
			i -= 100;
		}
		if (c.length) copy(c);
		else app.addPopupMessage('All done! Have a good day now :3');
	};
	const copy = async (c) => {
		await navigator.clipboard.write([new ClipboardItem({'text/html':table(c)})]);
		const j=i+100;
		let msg = `between ${j} and ${j+100}`;
		if (j===600) msg = 'above 600';
		if (j===0) msg = 'below 100';
		msg = `Generated table for speed tiers ${msg} and copied it to your clipboard! Paste directly into a google doc.`;
		msg += '<br /><br />(Ignore the text prompt, it is no longer needed)';
		app.addPopupPrompt(msg, 'Copy Next Table', next);
	};
	app.addPopupPrompt('Input a comma-separated list of Pokemon for speed tiers.', 'Generate', gen);
}catch(e){alert(e)}}();
