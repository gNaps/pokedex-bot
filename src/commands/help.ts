import { CommandContext, Context } from "grammy";

export const help = (ctx: CommandContext<Context>) => {
  return ctx.reply(
    `Ciao! Sono il professor OakBot, un bot che può aiutarti con i pokemon. 🎉 ✨

Ecco i comandi disponibili che puoi usare, controlla gli esempi per capire al meglio come utilizzarli 
<em>(per la maggior parte dei comandi puoi scrivermi sia il nome del pokemon che il numero del pokedex)</em>:

- /evo => ti dirò la catena evolutiva del pokemon e gli step necessari per evolverlo (Es. <pre> /evo eevee </pre>)
- /type => ti dirò le debolezze/resistenze/immunità del tipo (Es. <pre> /type fairy </pre> o <pre> /type eevee </pre>)
- /stats  => ti dirò le statistiche basi del pokemon (Es. <pre> /stats eevee </pre>)
- /model  => ti mostrerò gli ultimi model del pokemon (Es. <pre> /model eevee </pre>)
- /shiny => ti mostrerò gli ultimi model shiny del pokemon (Es. <pre> /artwork eevee </pre>)
`,
    { parse_mode: "HTML" }
  );
};
