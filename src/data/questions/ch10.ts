import type { Question } from '../../types';

export const CH10_QUESTIONS: Question[] = [
  {
    id: 'ch10-q01',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'When does New York State law require you to turn ON your headlights?',
    promptPt: 'Quando a lei do Estado de Nova York exige que você ligue os FARÓIS do carro?',
    choices: [
      { id: 'A', textEn: 'Only between midnight and sunrise', textPt: 'Apenas entre meia-noite e o nascer do sol' },
      { id: 'B', textEn: 'From 30 minutes after sunset to 30 minutes before sunrise, AND whenever windshield wipers are in use', textPt: 'De 30 minutos após o pôr do sol até 30 minutos antes do nascer do sol, E sempre que os limpadores de para-brisa estiverem ligados' },
      { id: 'C', textEn: 'Only in heavy rainstorms when visibility drops under 50 feet', textPt: 'Apenas em tempestades fortes' },
      { id: 'D', textEn: 'Daytime running lights alone always meet the wipers rule', textPt: 'Luzes diurnas (DRL) já substituem os faróis na chuva' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Remember NY’s "Wipers On = Headlights On" law! Turn on full headlights whenever wipers are running for rain, snow, sleet, or fog, and from 1/2 hour after sunset to 1/2 hour before sunrise.',
    explanationPt:
      'Guarde esta regra de NY: "Limpador ligado = Farol ligado"! Além da noite (30 min após o pôr do sol até 30 min antes do nascer do sol), é obrigatório ligar o farol baixo sempre que ligar o limpador de para-brisa na chuva ou neve.',
    glossaryTerms: ['low beams', 'windshield wipers'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Headlights & Weather',
  },
  {
    id: 'ch10-q02',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'At night, when must you dim your high-beam headlights to low beams?',
    promptPt: 'À noite, a que distância você deve baixar o farol alto (high beams) para farol baixo?',
    choices: [
      { id: 'A', textEn: 'Within 500 feet of an oncoming vehicle, and within 200 feet when following behind a vehicle', textPt: 'A 500 pés (~150 m) de carro vindo no sentido contrário, e a 200 pés (~60 m) atrás de outro carro' },
      { id: 'B', textEn: 'Within 100 feet in both directions', textPt: 'A 100 pés em ambas as situações' },
      { id: 'C', textEn: 'Within 1,000 feet behind any vehicle', textPt: 'A 1.000 pés atrás de outro veículo' },
      { id: 'D', textEn: 'Only inside city limits', textPt: 'Apenas dentro de cidades' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Memorize 500 & 200: dim high beams within 500 feet (~150 m) of an oncoming car, and within 200 feet (~60 m) when approaching another vehicle from behind so you don’t blind their mirrors.',
    explanationPt:
      'Grave os dois números: 500 pés (~150 m) de carro vindo de frente e 200 pés (~60 m) atrás de outro carro (para não ofuscar o retrovisor dele).',
    glossaryTerms: ['high beams', 'low beams', 'oncoming traffic'],
    nyRuleSwitch: {
      titleEn: '500 ft Front / 200 ft Behind',
      titlePt: '500 pés na frente (~150 m) / 200 pés atrás (~60 m)',
      noteEn: 'Easy memory trick: oncoming headlights are brighter toward your eyes (bigger number = 500 ft); following behind (smaller number = 200 ft).',
      notePt: 'Dica para lembrar na hora: carro vindo de frente (maior = 500 ft); carro na mesma mão à frente (menor = 200 ft).',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 10 — High Beams',
  },
  {
    id: 'ch10-q03',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'What is the maximum legal speed limit in New York State when NO speed limit sign is posted?',
    promptPt: 'Qual é o limite máximo de velocidade no Estado de Nova York quando NÃO há placa indicando velocidade?',
    choices: [
      { id: 'A', textEn: '45 mph', textPt: '45 mph' },
      { id: 'B', textEn: '55 mph (25 mph default inside New York City)', textPt: '55 mph (e 25 mph padrão dentro da cidade de Nova York / NYC)' },
      { id: 'C', textEn: '65 mph everywhere statewide', textPt: '65 mph em todo o estado' },
      { id: 'D', textEn: '35 mph on all highways', textPt: '35 mph em todas as rodovias' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'When no speed limit is posted on NY state highways and country roads, the statewide limit is 55 mph (~88 km/h). (Inside New York City, the unposted default is 25 mph; certain rural interstates post 65 mph.)',
    explanationPt:
      'Quando não há placa no Estado de NY (como em muitas estradas do Hudson Valley), o limite padrão é 55 mph (~88 km/h). Dentro de New York City, o padrão sem placa é 25 mph (~40 km/h).',
    glossaryTerms: ['expressway'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Speed Limits',
  },
  {
    id: 'ch10-q04',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'During a Hudson Valley winter, why are bridges and overpasses especially dangerous when temperatures hover near freezing?',
    promptPt: 'No inverno do Hudson Valley, por que pontes e viadutos ficam especialmente perigosos perto de 0 °C (32 °F)?',
    choices: [
      { id: 'A', textEn: 'They never get treated with salt', textPt: 'Eles nunca recebem sal' },
      { id: 'B', textEn: 'Cold air flows both above and below them, so bridges freeze BEFORE regular roadways ("black ice")', textPt: 'O ar frio passa por cima e por baixo, fazendo pontes congelarem ANTES do restante da estrada ("gelo negro")' },
      { id: 'C', textEn: 'Bridges are always steeper than hills', textPt: 'Pontes são sempre mais íngremes' },
      { id: 'D', textEn: 'Wind pushes only heavy SUVs sideways', textPt: 'O vento só atinge SUVs' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Because cold air circulates under the bridge deck too, bridges and overpasses freeze before the surrounding pavement—creating nearly invisible black ice.',
    explanationPt:
      'Como o ar gelado passa por cima e por baixo da estrutura, pontes e viadutos congelam ANTES do asfalto comum no chão — formando o traiçoeiro "black ice" (gelo transparente).',
    glossaryTerms: ['black ice'],
    nyRuleSwitch: {
      titleEn: 'Hudson Valley Winter Essential!',
      titlePt: 'Essencial para o inverno no Hudson Valley!',
      noteEn: 'If you learned to drive in Brazil, winter driving is new: bridges freeze first, never use cruise control on wet/icy roads, and increase following distance to 4+ seconds.',
      notePt: 'Para quem dirigiu no Brasil, o inverno de NY traz novidades importantes: pontes congelam primeiro, nunca use piloto automático na chuva/neve/gelo e deixe bem mais espaço para frear!',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Winter Driving',
  },
  {
    id: 'ch10-q05',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'Your rear wheels begin to skid on icy or snowy pavement. What is the first thing you should do?',
    promptPt: 'As rodas traseiras começam a derrapar (skid) no gelo ou na neve. O que você deve fazer primeiro?',
    choices: [
      { id: 'A', textEn: 'Slam the brake pedal down hard', textPt: 'Pisar fundo no freio com força' },
      { id: 'B', textEn: 'Take your foot off the gas and steer smoothly in the direction you want the front of the car to go', textPt: 'Tirar o pé do acelerador e virar o volante suavemente para a direção em que deseja que a frente do carro vá' },
      { id: 'C', textEn: 'Accelerate quickly to regain traction', textPt: 'Acelerar forte para recuperar tração' },
      { id: 'D', textEn: 'Turn the steering wheel completely opposite and yank the handbrake', textPt: 'Virar tudo ao contrário e puxar o freio de mão' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Take your foot off the accelerator (avoid slamming brakes), and turn the wheel gently in the direction you want the front of the vehicle to travel (the direction the rear is sliding).',
    explanationPt:
      'Tire o pé do acelerador (sem pisar bruscamente no freio!) e gire o volante com suavidade para o mesmo lado para onde a traseira está deslizando (onde você quer apontar a frente do carro).',
    glossaryTerms: ['skid', 'black ice'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Skids',
  },
  {
    id: 'ch10-q06',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'When driving in heavy rain at highway speed, your tires start riding on water and steering feels light ("hydroplaning"). What should you do?',
    promptPt: 'Dirigindo na chuva forte, seus pneus começam a deslizar sobre a água ("aquaplanagem"). O que fazer?',
    choices: [
      { id: 'A', textEn: 'Ease off the gas pedal slowly, hold the steering wheel steady, and let the tires regain contact', textPt: 'Tirar o pé do acelerador devagar, segurar o volante firme em linha reta e esperar os pneus tocarem o asfalto' },
      { id: 'B', textEn: 'Jam on the brakes immediately', textPt: 'Frear com tudo imediatamente' },
      { id: 'C', textEn: 'Turn the wheel sharply side to side to clear water', textPt: 'Girar o volante rápido de um lado para o outro' },
      { id: 'D', textEn: 'Turn on cruise control to keep speed steady', textPt: 'Ligar o piloto automático' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'During hydroplaning, do NOT brake hard or jerk the wheel. Ease off the gas until speed drops and the tires grip the road again.',
    explanationPt:
      'Na aquaplanagem, NÃO pise forte no freio nem dê golpes no volante! Alivie o acelerador suavemente até o carro perder velocidade e os pneus voltarem a aderir ao asfalto.',
    glossaryTerms: ['hydroplaning', 'expressway'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Rain & Hydroplaning',
  },
  {
    id: 'ch10-q07',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'When driving through thick fog, which lights should you use?',
    promptPt: 'Ao dirigir sob neblina densa (fog), quais luzes você deve usar?',
    choices: [
      { id: 'A', textEn: 'High-beam headlights to shine farther ahead', textPt: 'Farol alto para enxergar mais longe' },
      { id: 'B', textEn: 'Low-beam headlights (and fog lights if equipped), never high beams', textPt: 'Farol baixo (e farol de neblina, se houver) — nunca farol alto' },
      { id: 'C', textEn: 'Parking lights only', textPt: 'Apenas lanternas (meia-luz)' },
      { id: 'D', textEn: 'Hazard flashers while driving 55 mph', textPt: 'Pisca-alerta ligado a 55 mph' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'High beams bounce straight back off fog droplets into your eyes and blind you! Always use LOW beams in fog, snow, and heavy rain.',
    explanationPt:
      'O farol alto reflete na neblina direto nos seus olhos e piora muito a visibilidade! Use sempre FAROL BAIXO na neblina, neve ou chuva forte.',
    glossaryTerms: ['low beams', 'high beams'],
    watchOutWords: ['never'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Fog',
  },
  {
    id: 'ch10-q08',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'What does New York’s expanded "Move Over Law" require when you approach ANY vehicle stopped on the shoulder of a multi-lane highway?',
    promptPt: 'O que exige a "Move Over Law" ampliada de Nova York ao se aproximar de QUALQUER veículo parado no acostamento de uma rodovia?',
    choices: [
      { id: 'A', textEn: 'Move over only for police cars with red sirens', textPt: 'Mudar de faixa apenas para viaturas policiais' },
      { id: 'B', textEn: 'Slow down and safely move over a lane away from the stopped vehicle (emergency, tow, maintenance, OR disabled car)', textPt: 'Reduzir a velocidade e mudar de faixa com segurança afastando-se do veículo parado (viatura, guincho, manutenção OU carro comum quebrado)' },
      { id: 'C', textEn: 'Stop completely on the highway next to them', textPt: 'Parar no meio da rodovia ao lado dele' },
      { id: 'D', textEn: 'Honk your horn as you pass at full speed', textPt: 'Buzinar e passar na velocidade normal' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'NY’s Move Over Law applies to ALL stopped vehicles (police, fire, ambulance, tow trucks, highway workers, AND everyday disabled cars with hazards or flares). Slow down and change lanes away from the shoulder if safe.',
    explanationPt:
      'A "Move Over Law" de NY protege TODOS os veículos parados no acostamento (polícia, ambulância, guincho, obras E carros comuns parados com pisca-alerta). Reduza e, se puder com segurança, mude para a faixa ao lado!',
    glossaryTerms: ['Move Over Law', 'shoulder', 'expressway', 'lane'],
    nyRuleSwitch: {
      titleEn: 'Newer NY Law Highlight!',
      titlePt: 'Lei importante ampliada em Nova York!',
      noteEn: 'NY expanded the Move Over Law to protect ALL stopped vehicles—not just emergency vehicles. Always give stopped cars on the shoulder an open lane when safe.',
      notePt: 'NY ampliou a Move Over Law para proteger qualquer carro parado no acostamento, não apenas polícia e ambulância. Mude de faixa ou reduza bem!',
    },
    manualRef: 'NYS Driver’s Manual / NY VTL — Move Over Law',
  },
  {
    id: 'ch10-q09',
    chapterId: 'ch10',
    isRoadSign: false,
    promptEn: 'When entering an expressway (like I-87 or I-84) via an entrance ramp and acceleration lane, how should you merge?',
    promptPt: 'Ao entrar em uma rodovia expressa (como I-87 ou I-84) pela faixa de aceleração, como você deve se juntar ao trânsito?',
    choices: [
      { id: 'A', textEn: 'Stop at the end of the ramp before moving into traffic', textPt: 'Parar no final da rampa antes de entrar na pista' },
      { id: 'B', textEn: 'Signal, accelerate to match the speed of highway traffic, check mirrors and blind spot, and merge smoothly into a gap', textPt: 'Dar seta, acelerar até igualar a velocidade da rodovia, checar retrovisor e ponto cego e entrar suavemente em uma brecha' },
      { id: 'C', textEn: 'Force highway cars to brake because ramp traffic has the right-of-way', textPt: 'Entrar direto porque quem vem da rampa tem preferência' },
      { id: 'D', textEn: 'Enter at 25 mph and speed up later', textPt: 'Entrar a 25 mph e acelerar só depois' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Use the acceleration lane to match highway speed—stopping at the end makes merging dangerous! Remember: traffic already on the highway has the right-of-way.',
    explanationPt:
      'Use a faixa de aceleração para alcançar a velocidade dos carros da rodovia (parar no fim da alça é perigoso!). Lembre-se: quem já está na rodovia tem a preferência.',
    glossaryTerms: ['expressway', 'merge', 'blind spot', 'right-of-way'],
    manualRef: 'NYS Driver’s Manual, Ch. 10 — Expressway Driving',
  },
];
