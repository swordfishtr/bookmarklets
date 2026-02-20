Speed Tier Document Generator for 35 Pokes

Given a comma-separated list of Pokemon, generates the HTML for a series of Smogon styled tables containing speed tiers and writes them into the clipboard to be pasted into a Google Docs document.

Usage:

Open https://play.pokemonshowdown.com/teambuilder and navigate to any team for the desired format. Run the bookmarklet. You should be prompted in Showdown's UI for a list of Pokemon. Provide it, and after clicking `Generate`, you'll have the first table written into your clipboard. Paste it into your doc, come back to Showdown and click `Copy Next Table`. Repeat until it says you're done.

Notes:

Currently this script does not work on the Preact client rewrite.

This script works on any server that uses the old client and doesn't have drastic changes to the teambuilder and Dex. Meaning, yes you can create speed tiers for custom pokemon on e.g. Pokeathlon.
