import type { Question } from '../../types';

export const CH11_QUESTIONS: Question[] = [
  {
    id: 'ch11-q01',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'A yellow school bus stops ahead with its red lights flashing. When must traffic in the OPPOSITE direction stop in New York State?',
    promptPt: 'Um ônibus escolar amarelo para à frente com as luzes vermelhas piscando. Quando os carros no SENTIDO CONTRÁRIO devem parar em Nova York?',
    choices: [
      { id: 'A', textEn: 'Only on two-lane undivided streets', textPt: 'Apenas em ruas simples sem canteiro' },
      { id: 'B', textEn: 'ALWAYS—at least 20 feet away, EVEN on multi-lane and divided highways with a median', textPt: 'SEMPRE — a pelo menos 20 pés (~6 m), ATÉ MESMO em rodovias com várias faixas e canteiro central' },
      { id: 'C', textEn: 'Never, if there is a grass median or concrete barrier', textPt: 'Nunca, se houver canteiro gramado ou mureta' },
      { id: 'D', textEn: 'Only between 7:00 a.m. and 9:00 a.m.', textPt: 'Apenas entre 7h e 9h da manhã' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'This is one of the most tested NY rules! In New York State, when a school bus stops and flashes its RED lights, ALL vehicles from BOTH directions must stop at least 20 feet (~6 m) away—EVEN on a multi-lane or divided highway—until the red lights stop flashing or the driver/police waves you on.',
    explanationPt:
      'Questão campeã na prova de NY! Quando um ônibus escolar para com luzes VERMELHAS piscando, TODOS os carros nos DOIS sentidos devem parar a pelo menos 20 pés (~6 m) — ATÉ MESMO em rodovias de pista dupla com canteiro central! (Luz amarela piscante avisa que ele vai parar.)',
    glossaryTerms: ['school bus', 'divided highway', 'median'],
    watchOutWords: ['ALWAYS', 'EVEN'],
    nyRuleSwitch: {
      titleEn: 'Strict NY Rule — Even Across a Divided Highway!',
      titlePt: 'Regra rigorosíssima de NY (cai muito na prova!)',
      noteEn: 'Many US states don’t require opposite-direction traffic to stop across a divided median—New York DOES! Always stop at least 20 feet away from a school bus with flashing red lights.',
      notePt: 'Diferente de outros países e até de outros estados americanos, em Nova York você DEVE parar para o ônibus escolar mesmo estando do outro lado do canteiro central!',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 11 — School Buses',
  },
  {
    id: 'ch11-q02',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'What does a school bus with flashing YELLOW lights mean (before the red lights turn on)?',
    promptPt: 'O que indicam as luzes AMARELAS piscando em um ônibus escolar (antes de ligarem as vermelhas)?',
    choices: [
      { id: 'A', textEn: 'The bus is preparing to stop to load or unload children—slow down and prepare to stop', textPt: 'O ônibus está se preparando para parar para embarque/desembarque — reduza e prepare-se para parar' },
      { id: 'B', textEn: 'The bus has broken down; pass it immediately', textPt: 'O ônibus quebrou; ultrapasse já' },
      { id: 'C', textEn: 'Speed up quickly to pass before the red lights activate', textPt: 'Acelere rápido para passar antes da luz vermelha' },
      { id: 'D', textEn: 'Only vehicles behind the bus need to notice it', textPt: 'Apenas carros atrás precisam prestar atenção' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Flashing yellow lights warn that the school bus is slowing down and about to stop and turn on its red lights. Slow down and prepare to stop safely—never race past it!',
    explanationPt:
      'As luzes amarelas piscando avisam que o ônibus vai parar logo à frente e acionar as luzes vermelhas. Nunca acelere para tentar passar antes — reduza e prepare-se para parar.',
    glossaryTerms: ['school bus'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — School Buses',
  },
  {
    id: 'ch11-q03',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'An ambulance or police car approaches from behind or ahead with flashing lights and siren on. What must you do?',
    promptPt: 'Uma ambulância ou viatura policial se aproxima com giroflex e sirene ligados. O que você deve fazer?',
    choices: [
      { id: 'A', textEn: 'Stop immediately right in the middle of your lane or intersection', textPt: 'Parar imediatamente no meio da faixa ou do cruzamento' },
      { id: 'B', textEn: 'Pull over as close as possible to the right edge of the road and stop until it passes', textPt: 'Encostar o máximo possível no lado direito da pista e parar até a viatura passar' },
      { id: 'C', textEn: 'Speed up to stay ahead of the emergency vehicle', textPt: 'Acelerar para ficar na frente da viatura' },
      { id: 'D', textEn: 'Follow closely behind the ambulance to beat traffic', textPt: 'Seguir colado atrás da ambulância para aproveitar o caminho livre' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Pull calmly to the right side of the roadway (clear of intersections!) and come to a stop until the emergency vehicle passes. Also, stay at least 500 feet behind any responding fire truck.',
    explanationPt:
      'Encoste com segurança na borda direita da pista (nunca bloqueie um cruzamento!) e pare até o veículo de emergência passar. Nunca siga colado atrás dele.',
    glossaryTerms: ['intersection', 'yield'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Emergency Vehicles',
  },
  {
    id: 'ch11-q04',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'When red lights are flashing or a gate is lowered at a railroad crossing, how far back from the nearest rail must you stop?',
    promptPt: 'Quando as luzes vermelhas piscam ou a cancela abaixa em um cruzamento ferroviário, a que distância do trilho mais próximo você deve parar?',
    choices: [
      { id: 'A', textEn: 'At least 5 feet from the nearest rail', textPt: 'Pelo menos 5 pés' },
      { id: 'B', textEn: 'At least 15 feet (~4.5 m) from the nearest rail', textPt: 'Pelo menos 15 pés (~4,5 m) do trilho mais próximo' },
      { id: 'C', textEn: 'At least 100 feet from the nearest rail', textPt: 'Pelo menos 100 pés' },
      { id: 'D', textEn: 'Right next to the wooden gate', textPt: 'Encostado na cancela' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Stop at least 15 feet (~4.5 m) from the nearest track whenever warning lights flash, bells ring, a gate is lowered, a flag person signals, or a train approaches. Wait until gates are fully raised and lights stop—another train may come on a second track!',
    explanationPt:
      'Pare a pelo menos 15 pés (~4,5 m) do trilho mais próximo. Mesmo depois que o trem passar, espere as luzes apagarem e a cancela subir totalmente — pode haver outro trem vindo em sentido contrário!',
    glossaryTerms: ['railroad crossing'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Railroad Crossings',
  },
  {
    id: 'ch11-q05',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'You see a pedestrian carrying a white cane or walking with a guide dog waiting to cross the street. What does NY law require?',
    promptPt: 'Você vê um pedestre com bengala branca ou cão-guia aguardando para atravessar. O que a lei de NY exige?',
    choices: [
      { id: 'A', textEn: 'Yield the right-of-way and stop if necessary—they ALWAYS have the right-of-way', textPt: 'Dar total preferência e parar se necessário — eles SEMPRE têm a preferência' },
      { id: 'B', textEn: 'Honk softly to let them know you are passing', textPt: 'Dar uma buzinadinha para avisar que você vai passar' },
      { id: 'C', textEn: 'Yield only if there is a painted crosswalk', textPt: 'Dar preferência apenas se houver faixa pintada' },
      { id: 'D', textEn: 'Flash your headlights so they pause', textPt: 'Piscar o farol para eles esperarem' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Blind or visually impaired pedestrians using a white cane or guide dog ALWAYS have the right-of-way at any street or driveway—even without a marked crosswalk. Never honk (it can startle them or their guide dog).',
    explanationPt:
      'Pedestres cegos ou com baixa visão (com bengala branca ou cão-guia) têm preferência ABSOLUTA em qualquer travessia — mesmo sem faixa pintada. Nunca buzine!',
    glossaryTerms: ['pedestrian', 'right-of-way', 'yield', 'crosswalk'],
    watchOutWords: ['ALWAYS'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Pedestrians',
  },
  {
    id: 'ch11-q06',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'What rights and responsibilities do bicyclists have on New York roadways?',
    promptPt: 'Quais direitos e deveres têm os ciclistas nas ruas e estradas de Nova York?',
    choices: [
      { id: 'A', textEn: 'They must always ride facing oncoming traffic on the left side', textPt: 'Devem sempre pedalar na contramão à esquerda' },
      { id: 'B', textEn: 'They have the same rights and duties as motor vehicle drivers (riding with traffic on the right)', textPt: 'Têm os mesmos direitos e deveres dos motoristas (andam no mesmo sentido do trânsito, à direita)' },
      { id: 'C', textEn: 'They do not have to obey stop signs', textPt: 'Não precisam obedecer placas de STOP' },
      { id: 'D', textEn: 'Drivers never need to yield to bikes when turning right', textPt: 'Motoristas nunca precisam dar passagem a bicicletas ao virar à direita' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'In New York, bicycles are vehicles with the same rights and responsibilities as drivers. Give them ample room when passing and ALWAYS check your right blind spot for cyclists before making a right turn!',
    explanationPt:
      'Em NY, ciclistas têm os mesmos direitos e deveres que carros (circulam a favor do trânsito). Dê espaço seguro ao ultrapassar e SEMPRE cheque o ponto cego da direita antes de virar à direita!',
    glossaryTerms: ['blind spot', 'yield', 'oncoming traffic'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Bicyclists',
  },
  {
    id: 'ch11-q07',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'Around large tractor-trailers (semi-trucks), what are "No-Zones"?',
    promptPt: 'Ao redor de caminhões grandes (carretas), o que são as "No-Zones"?',
    choices: [
      { id: 'A', textEn: 'Rest areas where cars are not allowed to park', textPt: 'Áreas de descanso onde carros não entram' },
      { id: 'B', textEn: 'Huge blind spots in front, behind, and along both sides where the truck driver cannot see your car', textPt: 'Grandes pontos cegos na frente, atrás e nas laterais onde o caminhoneiro não consegue enxergar seu carro' },
      { id: 'C', textEn: 'Toll lanes restricted to trucks only', textPt: 'Cabines de pedágio só para caminhões' },
      { id: 'D', textEn: 'Lanes where the speed limit is 30 mph', textPt: 'Faixas com limite de 30 mph' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Trucks have massive blind spots ("No-Zones") directly in front, closely behind, and along both sides—especially the right side! Good rule: if you cannot see the truck driver’s face in their side mirror, they cannot see you. Also give trucks wide room for right turns.',
    explanationPt:
      'As "No-Zones" são os enormes pontos cegos ao redor de caminhões (principalmente à direita, bem atrás e colado na frente). Regra prática: se você não vê o rosto do caminhoneiro no espelho dele, ele não vê você!',
    glossaryTerms: ['blind spot'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Large Trucks & No-Zones',
  },
  {
    id: 'ch11-q08',
    chapterId: 'ch11',
    isRoadSign: false,
    promptEn: 'When sharing a lane or roadway with a motorcycle, how much lane space is the motorcyclist legally entitled to?',
    promptPt: 'Ao dividir a via com uma motocicleta, quanto espaço da faixa o motociclista tem direito por lei?',
    choices: [
      { id: 'A', textEn: 'Half a lane—cars may pass within the same lane', textPt: 'Meia faixa — carros podem dividir a faixa ao lado' },
      { id: 'B', textEn: 'The full width of the lane, just like any car', textPt: 'A largura inteira da faixa, exatamente como um carro' },
      { id: 'C', textEn: 'Only the paved shoulder', textPt: 'Apenas o acostamento' },
      { id: 'D', textEn: 'Two motorcycles must ride single file only on highways', textPt: 'Apenas o centro da faixa' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Motorcyclists are entitled to the FULL width of a traffic lane—never squeeze beside them in the same lane to pass. Also give them a wider following distance (3–4 seconds), because motorcycles stop quickly and swerve around potholes.',
    explanationPt:
      'Em NY, a moto tem direito à FAIXA INTEIRA! Nunca passe espremendo ao lado dela dentro da mesma faixa e mantenha distância extra atrás, pois motos freiam muito rápido.',
    glossaryTerms: ['lane', 'following distance', 'passing'],
    manualRef: 'NYS Driver’s Manual, Ch. 11 — Motorcycles',
  },
  {
    id: 'ch11-q09',
    chapterId: 'ch11',
    isRoadSign: true,
    signId: 'deer-crossing',
    promptEn: 'On a wooded Hudson Valley road at dusk, a deer suddenly leaps onto the road right in front of you. What is the safest action?',
    promptPt: 'Em uma estrada arborizada do Hudson Valley ao entardecer, um cervo surge de repente na sua frente. Qual é a reação mais segura?',
    choices: [
      { id: 'A', textEn: 'Swerve sharply across the center line into oncoming traffic', textPt: 'Desviar bruscamente para a contramão' },
      { id: 'B', textEn: 'Brake firmly while staying straight in your lane—do not swerve violently', textPt: 'Frear firme mantendo o carro reto na sua faixa — não dê guinada brusca no volante' },
      { id: 'C', textEn: 'Flash your high beams and speed up', textPt: 'Piscar o farol alto e acelerar' },
      { id: 'D', textEn: 'Honk continuously while letting go of the wheel', textPt: 'Buzinar soltando o volante' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Safety experts and NY guidance emphasize: "Don’t Veer for a Deer!" Brake firmly in your own lane—violent swerving often causes far worse crashes into trees or oncoming traffic. Watch carefully too: deer travel in groups, so where one crosses, others often follow!',
    explanationPt:
      'Dica vital no Hudson Valley (onde há muitos cervos ao amanhecer e entardecer!): freie firme na sua própria faixa sem dar guinada violenta para a contramão ou árvores. E atenção: cervos quase sempre andam em grupo — se um atravessou, outros costumam vir logo atrás!',
    glossaryTerms: ['lane', 'oncoming traffic'],
    nyRuleSwitch: {
      titleEn: 'Hudson Valley Reality: Deer Travel in Groups!',
      titlePt: 'Dica prática do Hudson Valley: cervos andam em grupo!',
      noteEn: 'If you spot one deer crossing at dusk or dawn, immediately slow down—a second or third deer is very often seconds behind it.',
      notePt: 'Viu um cervo atravessando perto da estrada no Hudson Valley? Reduza na hora — quase sempre vem outro logo atrás!',
    },
    manualRef: 'NYS Driver’s Manual / NYSDOT — Animal Crossings',
  },
];
