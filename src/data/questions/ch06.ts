import type { Question } from '../../types';

export const CH06_QUESTIONS: Question[] = [
  {
    id: 'ch06-q01',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'You are driving on a two-way road with a broken yellow line next to your lane and a solid yellow line on the other side. What does this mean?',
    promptPt: 'Você dirige em uma via de mão dupla com faixa amarela tracejada do seu lado e contínua do outro lado. O que isso significa?',
    choices: [
      { id: 'A', textEn: 'Neither side may pass', textPt: 'Nenhum dos dois lados pode ultrapassar' },
      { id: 'B', textEn: 'You may cross the line to pass when it is safe and clear ahead', textPt: 'Você pode cruzar a linha para ultrapassar se estiver seguro e livre à frente' },
      { id: 'C', textEn: 'Only oncoming traffic may pass', textPt: 'Apenas o sentido contrário pode ultrapassar' },
      { id: 'D', textEn: 'You must drive at least 10 mph faster', textPt: 'Você deve dirigir pelo menos 10 mph mais rápido' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Always read the line closest to YOUR lane: broken on your side means passing is permitted when the oncoming lane is clear and safe; solid on your side means no passing.',
    explanationPt:
      'Olhe sempre para a faixa mais próxima da SUA mão: se estiver tracejada do seu lado, a ultrapassagem é permitida quando o sentido contrário estiver livre; se estiver contínua do seu lado, é proibida.',
    glossaryTerms: ['pavement markings', 'passing', 'lane', 'oncoming traffic'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — Lane Markings for Passing',
  },
  {
    id: 'ch06-q02',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'In New York State, when are you legally allowed to pass another vehicle on the RIGHT?',
    promptPt: 'No Estado de Nova York, quando é permitido ultrapassar outro veículo pela DIREITA?',
    choices: [
      { id: 'A', textEn: 'Whenever you want by driving onto the paved shoulder', textPt: 'Sempre que quiser, usando o acostamento asfaltado' },
      { id: 'B', textEn: 'When the vehicle ahead is making or signaling a left turn, or on a multi-lane road with unobstructed pavement—NEVER driving onto the shoulder', textPt: 'Quando o carro da frente estiver virando à esquerda (ou com seta) ou em via com várias faixas no mesmo sentido — NUNCA usando o acostamento' },
      { id: 'C', textEn: 'Passing on the right is strictly illegal in every situation', textPt: 'Ultrapassar pela direita é ilegal em toda e qualquer situação' },
      { id: 'D', textEn: 'Only when the vehicle ahead is stopped at a school bus', textPt: 'Apenas quando o carro da frente parou para ônibus escolar' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'NY allows passing on the right ONLY on safe paved roadway (not the shoulder!) when: (1) the driver ahead is turning left or signaling left, or (2) you are on a one-way street or multi-lane road wide enough for two or more lanes in your direction.',
    explanationPt:
      'Em NY pode-se ultrapassar pela direita (sempre dentro da pista, NUNCA pelo acostamento!) quando o carro da frente vai virar à esquerda ou em rua/rodovia com duas ou mais faixas no mesmo sentido.',
    glossaryTerms: ['passing', 'shoulder', 'turn signal', 'lane'],
    watchOutWords: ['NEVER'],
    nyRuleSwitch: {
      titleEn: 'Passing on the Right Rule (Brazil/Europe vs. NY)',
      titlePt: 'Ultrapassagem pela direita (Brasil/Europa vs. NY)',
      noteEn: 'In Brazil & Europe passing on the right is heavily restricted. In NY it is legal on multi-lane roads or when the car ahead turns left—just NEVER use the shoulder!',
      notePt: 'No Brasil e na Europa quase nunca se ultrapassa pela direita. Em NY é permitido em pistas com várias faixas ou quando o carro da frente vira à esquerda — só NUNCA entre no acostamento!',
    },
    manualRef: 'NYS Driver’s Manual, Ch. 6 — Passing on the Right',
  },
  {
    id: 'ch06-q03',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'After passing another vehicle on a two-lane road, when is it safe to return to your right-hand lane?',
    promptPt: 'Após ultrapassar outro carro em pista simples, quando é seguro voltar para a faixa da direita?',
    choices: [
      { id: 'A', textEn: 'As soon as your rear bumper passes their front bumper', textPt: 'Assim que o seu para-choque traseiro passar pelo da frente deles' },
      { id: 'B', textEn: 'When you can see both headlights of the passed car in your inside rearview mirror', textPt: 'Quando você conseguir ver os dois faróis do carro ultrapassado no seu retrovisor interno' },
      { id: 'C', textEn: 'After driving half a mile in the left lane', textPt: 'Depois de rodar meia milha na faixa da esquerda' },
      { id: 'D', textEn: 'Only when the passed driver flashes their brights', textPt: 'Somente quando o outro motorista der sinal de luz' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Signal right and wait until you see the front (both headlights) of the passed vehicle in your inside rearview mirror before pulling back into the right lane—that prevents cutting them off.',
    explanationPt:
      'Dê seta para a direita e só retorne à faixa quando puder enxergar os dois faróis do carro ultrapassado pelo retrovisor central, evitando fechar o outro veículo.',
    glossaryTerms: ['passing', 'lane'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — How to Pass Safely',
  },
  {
    id: 'ch06-q04',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'What should you do when another driver safely begins passing you?',
    promptPt: 'O que você deve fazer quando outro motorista começa a ultrapassá-lo com segurança?',
    choices: [
      { id: 'A', textEn: 'Speed up so they finish quickly', textPt: 'Acelerar para ele passar mais rápido' },
      { id: 'B', textEn: 'Move toward the center line to warn them', textPt: 'Chegar perto da linha central para avisar' },
      { id: 'C', textEn: 'Maintain your speed or slow down slightly and stay in your lane—never speed up', textPt: 'Manter a velocidade (ou reduzir um pouco) e ficar na sua faixa — nunca acelere' },
      { id: 'D', textEn: 'Flash your hazard lights continuously', textPt: 'Ligar o pisca-alerta continuamente' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'Yield the right-of-way to the passing vehicle: do NOT accelerate while someone is passing you, as that traps them in the oncoming lane.',
    explanationPt:
      'Nunca acelere enquanto está sendo ultrapassado! Mantenha sua velocidade ou reduza levemente na sua faixa para que o outro carro complete a manobra rápido.',
    glossaryTerms: ['passing', 'yield', 'lane'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — Being Passed',
  },
  {
    id: 'ch06-q05',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'All of the following are places where passing is prohibited EXCEPT:',
    promptPt: 'Todos os locais abaixo são proibidos para ultrapassagem, EXCETO:',
    choices: [
      { id: 'A', textEn: 'Within 100 feet of an intersection, bridge, or railroad crossing', textPt: 'A menos de 100 pés de cruzamentos, pontes ou ferrovias' },
      { id: 'B', textEn: 'On a curve or hill where you cannot see clearly ahead', textPt: 'Em curvas ou subidas sem visibilidade clara à frente' },
      { id: 'C', textEn: 'When a school bus is stopped with flashing red lights', textPt: 'Quando um ônibus escolar estiver parado com luzes vermelhas piscando' },
      { id: 'D', textEn: 'On a straight two-way road with a broken yellow line and clear view ahead', textPt: 'Em uma reta de mão dupla com linha amarela tracejada e visão totalmente livre' },
    ],
    correctChoiceId: 'D',
    explanationEn:
      'Watch that word EXCEPT! You may pass on a straight stretch with a broken yellow line on your side and clear oncoming sight distance. Never pass near hills, curves, intersections, bridges, tunnels, railroad crossings, or stopped school buses.',
    explanationPt:
      'Olho na pegadinha "EXCEPT" (exceto)! Pode-se ultrapassar apenas em reta livre com linha tracejada do seu lado. Nunca perto de cruzamentos, pontes, ferrovias, curvas, subidas ou ônibus escolar.',
    glossaryTerms: ['passing', 'intersection', 'railroad crossing', 'school bus'],
    watchOutWords: ['EXCEPT'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — Where Passing Is Prohibited',
  },
  {
    id: 'ch06-q06',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'Before pulling out to pass on a two-lane Hudson Valley road, what must you ALWAYS check?',
    promptPt: 'Antes de sair para ultrapassar em uma estrada de pista simples no Hudson Valley, o que você SEMPRE deve verificar?',
    choices: [
      { id: 'A', textEn: 'Mirrors, blind spot over your left shoulder, pavement lines, and clear oncoming distance', textPt: 'Espelhos, ponto cego por cima do ombro esquerdo, pintura do asfalto e distância livre no sentido contrário' },
      { id: 'B', textEn: 'Only your inside rearview mirror', textPt: 'Apenas o espelho retrovisor interno' },
      { id: 'C', textEn: 'Only that the driver ahead has their brake lights off', textPt: 'Apenas se o carro da frente não está freando' },
      { id: 'D', textEn: 'That you honk twice first', textPt: 'Buzinar duas vezes antes' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'Always check mirrors AND glance over your left shoulder (blind spot) because another car behind you may already be passing you—and verify legal lines and clear distance ahead.',
    explanationPt:
      'Confira retrovisores E olhe por cima do ombro esquerdo (ponto cego) — outro carro atrás pode já estar tentando ultrapassar você! Cheque também a faixa no chão e o sentido contrário.',
    glossaryTerms: ['blind spot', 'passing', 'oncoming traffic'],
    watchOutWords: ['ALWAYS'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — How to Pass Safely',
  },
  {
    id: 'ch06-q07',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'When there is a single solid white line between lanes moving in the same direction, what does NY law advise?',
    promptPt: 'Quando há uma faixa branca contínua simples entre pistas no mesmo sentido, o que a regra de NY orienta?',
    choices: [
      { id: 'A', textEn: 'Crossing it to change lanes is discouraged and should be avoided unless special conditions require it', textPt: 'Desencoraja mudar de faixa — evite cruzá-la, salvo necessidade especial' },
      { id: 'B', textEn: 'It separates traffic moving in opposite directions', textPt: 'Ela separa carros em sentidos opostos' },
      { id: 'C', textEn: 'The lane is reserved exclusively for buses', textPt: 'A faixa é exclusiva para ônibus' },
      { id: 'D', textEn: 'Passing on the shoulder is permitted', textPt: 'É permitido ultrapassar pelo acostamento' },
    ],
    correctChoiceId: 'A',
    explanationEn:
      'A single solid white line separates same-direction lanes where lane changes are discouraged (for instance near intersections or merges); a double solid white line prohibits lane changes completely.',
    explanationPt:
      'Faixa branca contínua simples separa faixas no mesmo sentido e indica que você deve evitar trocar de faixa ali (comum perto de cruzamentos e alças); branca contínua dupla proíbe totalmente.',
    glossaryTerms: ['pavement markings', 'lane'],
    manualRef: 'NYS Driver’s Manual, Ch. 4 & 6 — Pavement Markings',
  },
  {
    id: 'ch06-q08',
    chapterId: 'ch06',
    isRoadSign: false,
    promptEn: 'If you pull out to pass and realize an oncoming vehicle is approaching faster than you expected, what is the safest choice?',
    promptPt: 'Se você começou a ultrapassar e percebeu que um carro no sentido contrário vem mais rápido que o esperado, qual é a atitude mais segura?',
    choices: [
      { id: 'A', textEn: 'Floor the gas pedal and hope you clear the truck ahead', textPt: 'Pisar fundo no acelerador e torcer para dar tempo' },
      { id: 'B', textEn: 'Brake gently and safely drop back behind the vehicle you were passing', textPt: 'Frear com suavidade e voltar com segurança para trás do veículo que você ia ultrapassar' },
      { id: 'C', textEn: 'Flash your high beams so the oncoming car moves onto the shoulder', textPt: 'Piscar o farol alto para o outro carro ir para o acostamento' },
      { id: 'D', textEn: 'Stop completely in the oncoming lane', textPt: 'Parar completamente na contramão' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'If in doubt, never force a pass. Ease off, brake gently, and fall safely back into the gap behind the vehicle you intended to pass.',
    explanationPt:
      'Na dúvida, aborte a ultrapassagem: tire o pé, reduza com controle e retorne com segurança para trás do veículo que estava à sua frente.',
    glossaryTerms: ['oncoming traffic', 'passing'],
    manualRef: 'NYS Driver’s Manual, Ch. 6 — Safe Passing',
  },
];
