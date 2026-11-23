import type { Question } from '../../types';

export const CH08_QUESTIONS: Question[] = [
  {
    id: 'ch08-q01',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'In normal dry weather and good road conditions, what minimum following distance does the NYS Driver’s Manual recommend?',
    promptPt: 'Em condições normais de tempo seco e pista boa, qual distância mínima de seguimento o Manual de NY recomenda?',
    choices: [
      { id: 'A', textEn: 'At least one car length for every 20 mph', textPt: 'Um carro de distância para cada 20 mph' },
      { id: 'B', textEn: 'At least a two-second space cushion behind the vehicle ahead', textPt: 'Pelo menos dois segundos de espaço atrás do veículo da frente (regra dos 2 segundos)' },
      { id: 'C', textEn: 'Half a second in suburban traffic', textPt: 'Meio segundo em vias suburbanas' },
      { id: 'D', textEn: 'Always exactly 50 feet', textPt: 'Sempre exatos 50 pés' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'New York’s basic space cushion is the TWO-SECOND RULE: watch the car ahead pass a fixed landmark, then count "one-thousand-one, one-thousand-two." In rain, snow, darkness, or behind trucks/motorcycles, increase to 3–4+ seconds.',
    explanationPt:
      'Em NY usa-se a regra dos DOIS SEGUNDOS (two-second rule): marque um ponto fixo quando o carro da frente passar e conte 2 segundos completos. Na chuva, neve ou noite, aumente para 3 a 4 segundos ou mais!',
    glossaryTerms: ['following distance'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Defensive Driving',
  },
  {
    id: 'ch08-q02',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'Under current New York State law, who is required to wear a seat belt in a passenger vehicle?',
    promptPt: 'Pela lei atual do Estado de Nova York, quem é obrigado a usar cinto de segurança em um carro de passeio?',
    choices: [
      { id: 'A', textEn: 'Only the driver and front-seat passenger', textPt: 'Apenas o motorista e o passageiro da frente' },
      { id: 'B', textEn: 'The driver, front-seat passengers, and back-seat passengers under 16 only', textPt: 'Motorista, frente e apenas menores de 16 anos atrás' },
      { id: 'C', textEn: 'ALL drivers and passengers in BOTH the front and back seats, regardless of age', textPt: 'TODOS os motoristas e passageiros, tanto no banco da frente quanto no banco de trás, de qualquer idade' },
      { id: 'D', textEn: 'Only when driving on expressways above 45 mph', textPt: 'Apenas em rodovias acima de 45 mph' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'Since November 2020, New York requires EVERY occupant—front seat AND back seat, of ANY age (including adults in back seats and taxis/rideshares)—to wear a seat belt. Police can stop a vehicle solely for an unbuckled occupant.',
    explanationPt:
      'Desde novembro de 2020, NY exige cinto de segurança para TODOS os ocupantes, na frente E no banco de trás, de qualquer idade (inclusive adultos no banco traseiro e Uber/táxi)!',
    glossaryTerms: ['seat belt', 'expressway'],
    manualRef: 'NYS Driver’s Manual / NY VTL § 1229-c — Seat Belt Law',
  },
  {
    id: 'ch08-q03',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'When are you allowed to hold a cell phone in your hand to read a text message in New York?',
    promptPt: 'Quando é permitido segurar o celular na mão para ler uma mensagem de texto em Nova York?',
    choices: [
      { id: 'A', textEn: 'While stopped at a red traffic light', textPt: 'Enquanto estiver parada no sinal vermelho' },
      { id: 'B', textEn: 'Only when driving under 25 mph', textPt: 'Apenas dirigindo abaixo de 25 mph' },
      { id: 'C', textEn: 'Never while operating a vehicle in traffic—only when safely parked off the travel lanes', textPt: 'Nunca enquanto opera o carro no trânsito — apenas quando estacionada com segurança fora da pista' },
      { id: 'D', textEn: 'Whenever the phone is held near the steering wheel', textPt: 'Sempre que segurar o celular perto do volante' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'In NY, holding a phone or texting is illegal even when stopped in traffic or at a red light! A handheld phone or texting violation carries 5 driver license points.',
    explanationPt:
      'Em NY é proibido segurar o celular ou mandar mensagens até mesmo parada no semáforo vermelho ou no congestionamento! Só use se estiver estacionada com segurança (a infração soma 5 pontos!).',
    glossaryTerms: ['handheld device'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Cell Phones & Distracted Driving',
  },
  {
    id: 'ch08-q04',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'Before changing lanes on a multi-lane road, adjusting your mirrors is not enough. What else must you do?',
    promptPt: 'Antes de mudar de faixa em uma pista dupla ou rodovia, olhar nos retrovisores não basta. O que mais você deve fazer?',
    choices: [
      { id: 'A', textEn: 'Turn off your cruise control and speed up quickly', textPt: 'Acelerar rapidamente' },
      { id: 'B', textEn: 'Signal and glance quickly over your shoulder to check your blind spot', textPt: 'Dar seta e dar uma olhada rápida por cima do ombro para checar o ponto cego' },
      { id: 'C', textEn: 'Tap your brakes twice to warn cars behind you', textPt: 'Pisar duas vezes no freio para avisar quem vem atrás' },
      { id: 'D', textEn: 'Change two lanes at once to spend less time merging', textPt: 'Cruzar duas faixas de uma vez' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Every car has blind spots beside the rear corners where mirrors cannot see another vehicle. Signal 100 feet ahead, check mirrors, and do a quick shoulder glance into the target lane.',
    explanationPt:
      'Todo carro tem pontos cegos laterais que não aparecem no espelho. Dê seta com antecedência, cheque os espelhos e olhe rápido por cima do ombro antes de mudar uma faixa de cada vez.',
    glossaryTerms: ['blind spot', 'lane', 'turn signal'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Changing Lanes',
  },
  {
    id: 'ch08-q05',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'If a driver behind you is tailgating (following much too closely), what is the safest reaction?',
    promptPt: 'Se um motorista atrás estiver colado na sua traseira (tailgating), qual é a reação mais segura?',
    choices: [
      { id: 'A', textEn: 'Tap your brakes sharply ("brake-check") to warn them', textPt: 'Dar uma freada brusca para assustá-lo' },
      { id: 'B', textEn: 'Speed up well above the speed limit', textPt: 'Acelerar muito acima do limite' },
      { id: 'C', textEn: 'Ease off slightly to increase space in front of you, or safely change lanes/pull aside to let them pass', textPt: 'Aumentar o espaço à sua frente (reduzindo suavemente) ou mudar de faixa com segurança para deixá-lo passar' },
      { id: 'D', textEn: 'Turn on your high beams', textPt: 'Ligar o farol alto' },
    ],
    correctChoiceId: 'C',
    explanationEn:
      'Never brake-check or escalate! Create a larger cushion ahead of you so you never have to slam your brakes suddenly, and let the tailgater pass safely when possible.',
    explanationPt:
      'Nunca dê freada de susto nem entre em provocação! Aumente sua margem à frente (para frear suave se precisar) e, quando seguro, dê passagem para o apressado ir embora.',
    glossaryTerms: ['tailgating', 'following distance', 'lane'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Defensive Driving',
  },
  {
    id: 'ch08-q06',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'How far ahead should a defensive driver scan the roadway in suburban or highway driving?',
    promptPt: 'A quantos segundos à frente um motorista defensivo deve olhar ao dirigir em vias suburbanas ou rodovias?',
    choices: [
      { id: 'A', textEn: 'Only the bumper of the car right ahead (2 seconds)', textPt: 'Apenas o para-choque do carro logo à frente (2 segundos)' },
      { id: 'B', textEn: 'About 12 to 15 seconds ahead (around 1–1.5 city blocks or a quarter mile)', textPt: 'Cerca de 12 a 15 segundos à frente (1 quarteirão na cidade ou ~400 m na estrada)' },
      { id: 'C', textEn: 'Only at the pavement lines right beside your tires', textPt: 'Apenas as faixas logo ao lado dos pneus' },
      { id: 'D', textEn: 'At least 60 seconds ahead', textPt: 'Pelo menos 60 segundos à frente' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Looking 12–15 seconds ahead helps you spot brake lights, pedestrians, turning cars, or deer early—giving you calm time to react smoothly.',
    explanationPt:
      'Olhar longe (12 a 15 segundos à frente) permite perceber semáforos, freadas, pedestres ou animais bem antes, evitando sustos e freadas bruscas.',
    glossaryTerms: ['defensive driving'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Scanning Ahead',
  },
  {
    id: 'ch08-q07',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'What helps prevent "highway hypnosis" on long, straight drives?',
    promptPt: 'O que ajuda a evitar a "hipnose da rodovia" (cansaço/desatenção) em viagens longas e retas?',
    choices: [
      { id: 'A', textEn: 'Staring fixedly at the center yellow line', textPt: 'Olhar fixamente para a linha central' },
      { id: 'B', textEn: 'Keeping your eyes moving, checking mirrors regularly, and stopping to rest when tired', textPt: 'Manter os olhos em movimento, checar retrovisores com frequência e parar para descansar ao sentir sono' },
      { id: 'C', textEn: 'Using cruise control while closing one eye at a time', textPt: 'Usar piloto automático' },
      { id: 'D', textEn: 'Turning up the cabin heater to stay cozy', textPt: 'Aumentar o aquecedor do carro no máximo' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Shift your gaze from far ahead to mirrors and roadsides, keep fresh air circulating, and pull off at a rest area whenever drowsiness hits.',
    explanationPt:
      'Movimente o olhar (longe, retrovisores, laterais), mantenha o carro ventilado e pare em uma área de descanso se sentir qualquer sonolência.',
    glossaryTerms: ['highway hypnosis', 'defensive driving'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Driver Fatigue',
  },
  {
    id: 'ch08-q08',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'When your vehicle has Anti-lock Brakes (ABS) and you need to make an emergency stop, how should you brake?',
    promptPt: 'Se o seu carro tem freios ABS e você precisa frear em uma emergência, como deve pisar no freio?',
    choices: [
      { id: 'A', textEn: 'Pump the brake pedal rapidly up and down', textPt: 'Bombear o pedal de freio para cima e para baixo rapidamente' },
      { id: 'B', textEn: 'Press the brake pedal firmly and steadily while steering safely', textPt: 'Pisar firme e de forma contínua no pedal enquanto mantém o controle da direção' },
      { id: 'C', textEn: 'Pull the parking brake while in Drive', textPt: 'Puxar o freio de estacionamento' },
      { id: 'D', textEn: 'Release the brake immediately if you feel the pedal vibrate', textPt: 'Soltar o freio se o pedal vibrar' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'With modern ABS brakes, do NOT pump the pedal! Apply firm, steady pressure—the computer pulses the brakes automatically (a mild vibration is normal) so you can still steer around hazards.',
    explanationPt:
      'Com freio ABS, NÃO bombeie o pedal! Pise firme e constante (é normal sentir o pedal vibrar — é o sistema evitando o travamento das rodas para você continuar conseguindo desviar).',
    glossaryTerms: ['defensive driving'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Braking & ABS',
  },
  {
    id: 'ch08-q09',
    chapterId: 'ch08',
    isRoadSign: false,
    promptEn: 'What should you do if another driver behaves aggressively or tries to provoke road rage?',
    promptPt: 'O que você deve fazer se outro motorista agir de forma agressiva ou provocar briga no trânsito (road rage)?',
    choices: [
      { id: 'A', textEn: 'Make eye contact and gesture back to stand your ground', textPt: 'Encarar e gesticular de volta' },
      { id: 'B', textEn: 'Stay calm, avoid eye contact, give them plenty of space, and safely let them move ahead', textPt: 'Manter a calma, evitar contato visual, dar espaço e deixá-lo ir à frente com segurança' },
      { id: 'C', textEn: 'Follow closely to record their license plate', textPt: 'Seguir de perto para anotar a placa' },
      { id: 'D', textEn: 'Block them from changing lanes', textPt: 'Impedir que ele mude de faixa' },
    ],
    correctChoiceId: 'B',
    explanationEn:
      'Never engage with an aggressive driver. Stay calm, avoid eye contact or horn battles, create space, and if threatened drive to a police station or public place.',
    explanationPt:
      'Nunca responda a provocações no trânsito. Evite contato visual, dê bastante espaço e deixe o motorista irritado seguir caminho.',
    glossaryTerms: ['defensive driving'],
    manualRef: 'NYS Driver’s Manual, Ch. 8 — Road Rage',
  },
];
