import type { Question } from '../../types';

export const CH05_QUESTIONS: Question[] = [
  {
    id: 'ch05-q01',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'Two cars arrive at an uncontrolled intersection (no signs or traffic lights) at the exact same time. Which car has the right-of-way?',
    promptPt: 'Dois carros chegam exatamente ao mesmo tempo em um cruzamento sem placas e sem semáforo. Quem tem a preferência?',
    choices: [
      { id: 'A', textEn: 'The vehicle on the left', textPt: 'O veículo que está à esquerda' },
      { id: 'B', textEn: 'The vehicle on the right', textPt: 'O veículo que está à direita' },
      { id: 'C', textEn: 'The vehicle traveling on the wider street', textPt: 'O veículo da rua mais larga' },
      { id: 'D', textEn: 'The vehicle planning to turn left', textPt: 'O veículo que vai virar à esquerda' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'When two vehicles reach an uncontrolled intersection or an all-way STOP at the same time, the driver on the LEFT must yield to the driver on the RIGHT.',
    explanationPt:
      'Quando dois carros chegam juntos a um cruzamento sem sinalização (ou a um 4-way STOP), quem está à ESQUERDA deve dar preferência a quem vem pela DIREITA.',
    glossaryTerms: ['intersection', 'right-of-way', 'yield'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Right-of-Way',
  },
  {
    id: 'ch05-q02',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'At an all-way (4-way) STOP intersection, which driver goes first?',
    promptPt: 'Em um cruzamento com placa PARE nos 4 lados (4-way STOP), qual motorista sai primeiro?',
    choices: [
      { id: 'A', textEn: 'The driver going straight always goes before any turning driver', textPt: 'Quem vai seguir reto sempre sai antes de quem vai virar' },
      { id: 'B', textEn: 'The driver who stopped at the intersection first', textPt: 'O motorista que parou primeiro no cruzamento' },
      { id: 'C', textEn: 'Whoever flashes their headlights first', textPt: 'Quem piscar os faróis primeiro' },
      { id: 'D', textEn: 'The largest vehicle at the corner', textPt: 'O maior veículo da esquina' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'At an all-way STOP, vehicles proceed in the exact order they arrived and stopped ("first to stop, first to go"). Only if two arrive simultaneously does the vehicle on the right go first.',
    explanationPt:
      'Nos famosos 4-way stops americanos, passa quem chegou e parou primeiro! Só vale a regra da direita se dois carros chegarem exatamente empatados.',
    glossaryTerms: ['intersection'],
    nyRuleSwitch: {
      titleEn: '4-Way Stops (New to Most Brazil & Europe Drivers)',
      titlePt: 'Cruzamento "4-Way Stop" (muito comum no Hudson Valley!)',
      noteEn: 'Suburban New York uses 4-way STOP signs everywhere instead of roundabouts or "via preferencial." Remember: First to arrive & stop goes first!',
      notePt: 'Nos subúrbios de NY há muitos cruzamentos com "All-Way / 4-Way Stop" no lugar de rotatórias. A regra é super educada: chegou primeiro, parou completo, vai primeiro.',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Intersections',
  },
  {
    id: 'ch05-q03',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'You want to turn left at an intersection. Who must you yield the right-of-way to?',
    promptPt: 'Você quer virar à esquerda em um cruzamento. A quem você deve dar preferência?',
    choices: [
      { id: 'A', textEn: 'Only vehicles behind you', textPt: 'Apenas aos veículos atrás de você' },
      { id: 'B', textEn: 'Oncoming vehicles going straight or turning right, plus pedestrians in the crosswalk', textPt: 'Veículos no sentido contrário (indo reto ou virando à direita) e pedestres na faixa' },
      { id: 'C', textEn: 'No one if your traffic light is solid green', textPt: 'A ninguém, se o seu semáforo estiver verde' },
      { id: 'D', textEn: 'Only oncoming trucks and buses', textPt: 'Apenas a caminhões e ônibus no sentido contrário' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'A steady green light (without a green arrow) does not protect left turns! You must wait for oncoming traffic and any crossing pedestrians before turning left.',
    explanationPt:
      'Sinal verde comum (sem seta verde exclusiva) exige que você espere o trânsito vindo em sentido contrário passar — além dos pedestres na faixa — antes de virar à esquerda.',
    glossaryTerms: ['yield', 'right-of-way', 'oncoming traffic', 'crosswalk'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Right-of-Way',
  },
  {
    id: 'ch05-q04',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'In New York State, how far ahead must you activate your turn signal before making a turn or changing lanes?',
    promptPt: 'No Estado de Nova York, com quantos pés de antecedência você deve ligar a seta antes de virar ou mudar de faixa?',
    choices: [
      { id: 'A', textEn: 'At least 25 feet (~7.5 m)', textPt: 'Pelo menos 25 pés (~7,5 m)' },
      { id: 'B', textEn: 'At least 50 feet (~15 m)', textPt: 'Pelo menos 50 pés (~15 m)' },
      { id: 'C', textEn: 'At least 100 feet (~30 m)', textPt: 'Pelo menos 100 pés (~30 m)' },
      { id: 'D', textEn: 'At least 300 feet (~90 m)', textPt: 'Pelo menos 300 pés (~90 m)' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'New York law requires signaling your intention to turn or change lanes continuously for at least the last 100 feet (~30 meters) before the maneuver.',
    explanationPt:
      'A lei de NY exige dar seta continuamente por pelo menos 100 pés (cerca de 30 metros) antes de virar ou trocar de faixa.',
    glossaryTerms: ['turn signal', 'lane'],
    nyRuleSwitch: {
      titleEn: '100 Feet ≈ 30 Meters',
      titlePt: 'Conversão métrica: 100 pés ≈ 30 metros',
      noteEn: 'Think of ~30 meters (about 6 car lengths) before a suburban corner—memorize "100 feet" for the test!',
      notePt: 'Pense em cerca de 30 metros (uns 6 carros de distância) antes da esquina — e grave o número "100 feet" para a prova!',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Signaling',
  },
  {
    id: 'ch05-q05',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'If your car’s turn signals stop working, what hand-and-arm signal means you are turning RIGHT?',
    promptPt: 'Se as setas do carro falharem, qual sinal com o braço esquerdo pela janela indica conversão à DIREITA?',
    choices: [
      { id: 'A', textEn: 'Left arm extended straight out horizontally', textPt: 'Braço esquerdo estendido reto na horizontal' },
      { id: 'B', textEn: 'Left arm bent upward at a 90-degree angle (hand pointing up)', textPt: 'Braço esquerdo dobrado a 90° apontando para cima' },
      { id: 'C', textEn: 'Left arm bent downward (hand pointing down)', textPt: 'Braço esquerdo apontando para baixo' },
      { id: 'D', textEn: 'Waving your arm in a circle', textPt: 'Abanar o braço em círculo' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Always use your LEFT arm out the driver’s window: straight out = LEFT turn; bent UP = RIGHT turn; bent DOWN = STOP or SLOW DOWN.',
    explanationPt:
      'Os três sinais com o braço esquerdo: reto para fora = ESQUERDA; apontando para CIMA = DIREITA; apontando para BAIXO = PARAR ou REDUZIR.',
    glossaryTerms: ['turn signal'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Hand Signals',
  },
  {
    id: 'ch05-q06',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'When approaching a roundabout (traffic circle) in New York, what should you do?',
    promptPt: 'Ao se aproximar de uma rotatória (roundabout) em Nova York, o que você deve fazer?',
    choices: [
      { id: 'A', textEn: 'Enter quickly to claim the inside lane before circulating cars pass', textPt: 'Entrar rápido para pegar a faixa interna' },
      { id: 'B', textEn: 'Slow down, look left, and yield to vehicles already circulating inside the roundabout', textPt: 'Reduzir, olhar para a esquerda e dar preferência aos carros que já estão circulando dentro da rotatória' },
      { id: 'C', textEn: 'Drive clockwise around the center island', textPt: 'Circular no sentido horário ao redor da ilha central' },
      { id: 'D', textEn: 'Stop inside the circle to let entering drivers merge', textPt: 'Parar dentro da rotatória para quem está entrando passar' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Traffic inside a NY roundabout travels counterclockwise. Slow down as you approach, yield to vehicles already inside (approaching from your left), and never stop inside the circle unless needed for safety.',
    explanationPt:
      'Nas rotatórias de NY (comuns no Hudson Valley!), o fluxo gira no sentido anti-horário. Reduza, olhe para a esquerda e dê preferência a quem já está dentro circulando.',
    glossaryTerms: ['roundabout', 'yield'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Roundabouts',
  },
  {
    id: 'ch05-q07',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'You are turning right from a two-way street onto another two-way street. Which lane should you start from and end in?',
    promptPt: 'Você vai virar à direita de uma rua de mão dupla para outra rua de mão dupla. De qual faixa deve sair e em qual deve entrar?',
    choices: [
      { id: 'A', textEn: 'Start as close as safely possible to the right curb and turn into the right-hand lane of the new street', textPt: 'Sair o mais próximo possível do meio-fio direito e entrar na faixa da direita da nova rua' },
      { id: 'B', textEn: 'Swing wide to the left first, then enter the left lane', textPt: 'Abrir primeiro para a esquerda e entrar na faixa da esquerda' },
      { id: 'C', textEn: 'Start in any lane and finish in whichever lane is empty', textPt: 'Sair de qualquer faixa e entrar na faixa mais vazia' },
      { id: 'D', textEn: 'Stop in the center of the intersection before turning', textPt: 'Parar no centro do cruzamento antes de virar' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'For a right turn, stay as close as practical to the right edge or curb and turn cleanly into the right lane—do not swing wide into oncoming or other lanes.',
    explanationPt:
      'Na conversão à direita, aproxime-se com segurança do meio-fio direito e entre na faixa direita da via transversal, sem abrir demais para o lado contrário.',
    glossaryTerms: ['lane', 'curb', 'intersection'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Turning',
  },
  {
    id: 'ch05-q08',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'Where are U-turns strictly prohibited in New York State?',
    promptPt: 'Onde fazer retorno (U-turn) é estritamente proibido no Estado de Nova York?',
    choices: [
      { id: 'A', textEn: 'On expressways, near hillcrests/curves with under 500 ft visibility, and in school zones', textPt: 'Em rodovias expressas, perto de topos/curvas com menos de 500 pés de visão e em áreas escolares' },
      { id: 'B', textEn: 'At every intersection with a green light', textPt: 'Em todo cruzamento com sinal verde' },
      { id: 'C', textEn: 'On suburban two-way residential streets', textPt: 'Em ruas residenciais suburbanas de mão dupla' },
      { id: 'D', textEn: 'U-turns are allowed on expressways if no police car is nearby', textPt: 'São permitidos em rodovias se não houver polícia por perto' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Never make a U-turn on an expressway, on a curve or hillcrest where you cannot be seen for at least 500 feet in either direction, in a school zone, or where a No U-Turn sign is posted.',
    explanationPt:
      'Nunca faça retorno em rodovias expressas, em curvas ou lombadas com menos de 500 pés (~150 m) de visibilidade, em áreas escolares ou onde houver placa proibindo.',
    glossaryTerms: ['u-turn', 'expressway'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — U-Turns',
  },
  {
    id: 'ch05-q09',
    chapterId: 'ch05',
    isRoadSign: false,
    promptEn: 'When pulling out from a private driveway or parking lot onto a street, who has the right-of-way?',
    promptPt: 'Ao sair de uma garagem particular ou estacionamento para entrar na rua, quem tem a preferência?',
    choices: [
      { id: 'A', textEn: 'You do, if you use your turn signal', textPt: 'Você, se ligar a seta' },
      { id: 'B', textEn: 'Pedestrians on the sidewalk AND all vehicles already on the street', textPt: 'Os pedestres na calçada E todos os veículos que já estão na rua' },
      { id: 'C', textEn: 'Only vehicles approaching from your left', textPt: 'Apenas os carros que vêm da esquerda' },
      { id: 'D', textEn: 'Whoever reaches the curb first', textPt: 'Quem chegar primeiro ao meio-fio' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Before crossing a sidewalk from a driveway or alley, you must stop and yield to pedestrians on the sidewalk, then yield to all traffic already traveling on the roadway.',
    explanationPt:
      'Ao sair de garagem ou estacionamento, pare antes da calçada para dar preferência a pedestres e depois dê preferência a todos os carros na via.',
    glossaryTerms: ['right-of-way', 'pedestrian', 'yield', 'curb'],
    manualRef: 'NYS Driver’s Manual, Ch. 5 — Right-of-Way',
  },
];
