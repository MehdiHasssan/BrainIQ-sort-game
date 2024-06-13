// levelsConfig.js

const levels = [
  // 1
  {
    balls: {red: 4},
    maxStackSize: 3,
    numberOfStacks: 2,
  },
  // 2
  {
    balls: {red: 4, orange: 4},
    maxStackSize: 4,
    numberOfStacks: 3,
  },
  // 3
  {
    balls: {green: 4, purple: 4},
    maxStackSize: 4,
    numberOfStacks: 3,
  },
  // 4
  {
    balls: {red: 4, black: 4},
    maxStackSize: 4,
    numberOfStacks: 3,
  },
  // 5
  {
    balls: {orange: 4, blue: 4, green: 4},
    maxStackSize: 4,
    numberOfStacks: 4,
  },
  // 6
  {
    balls: {red: 4, orange: 4, green: 4},
    maxStackSize: 4,
    numberOfStacks: 4,
  },
  // 7
  {
    balls: {orange: 4, blue: 4, green: 4},
    maxStackSize: 4,
    numberOfStacks: 4,
  },
  // 8
  {
    balls: {orange: 4, blue: 4, green: 4},
    maxStackSize: 4,
    numberOfStacks: 4,
  },
  // 9
  {
    balls: {orange: 4, blue: 4, green: 4},
    maxStackSize: 4,
    numberOfStacks: 4,
  },
  // 10
  {
    balls: {orange: 4, blue: 4, green: 4, purple: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 11
  {
    balls: {blue: 4, red: 4, orange: 4, purple: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 12
  {
    balls: {black: 4, blue: 4, green: 4, orange: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 13
  {
    balls: {red: 4, purple: 4, green: 4, orange: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 14
  {
    balls: {green: 4, blue: 4, red: 4, orange: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 15
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4},
    maxStackSize: 4,
    numberOfStacks: 5,
  },
  // 16
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4, red: 4},
    maxStackSize: 4,
    numberOfStacks: 6,
  },
  // 17
  {
    balls: {green: 4, black: 4, orange: 4, blue: 4, red: 4},
    maxStackSize: 4,
    numberOfStacks: 6,
  },
  // 18
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4, blue: 4},
    maxStackSize: 4,
    numberOfStacks: 6,
  },
  // 19
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4, blue: 4},
    maxStackSize: 4,
    numberOfStacks: 6,
  },
  // 20
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4, red: 4},
    maxStackSize: 4,
    numberOfStacks: 6,
  },
  //21
  {
    balls: {blue: 4, black: 4, brown: 4, orange: 4, red: 4,green:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //22
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4, red: 4,blue:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //23
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4, red: 4,purple:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //24
  {
    balls: {blue: 4, black: 4, brown: 4, orange: 4, red: 4,green:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //25
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4, red: 4,purple:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //26
  {
    balls: {blue: 4, black: 4, brown: 4, orange: 4, red: 4,green:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //27
  {
    balls: {blue: 4, black: 4, brown: 4, orange: 4, red: 4,green:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //28
  {
    balls: {green: 4, black: 4, brown: 4, orange: 4, red: 4,blue:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //29
  {
    balls: {blue: 4, black: 4, brown: 4, orange: 4, red: 4,green:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //30
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4, red: 4,blue:4},
    maxStackSize: 4,
    numberOfStacks: 7,
  },
  //31
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4, blue: 4, violet: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //32
  {
    balls: {violet: 4,purple: 4, black: 4, blue: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //33
  {
    balls: {purple: 4,"#7C8363":4, blue: 4, green: 4, orange: 4, violet: 4,red: 4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //34
  {
    balls: {purple: 4, blue: 4,violet: 4,"#7C8363":4, green: 4, orange: 4, red: 4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //35
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4,violet: 4, blue: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //36
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4, violet: 4,red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //37
  {
    balls: {violet: 4,purple: 4, black: 4, green: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //38
  {
    balls: {green: 4, black: 4, blue: 4, orange: 4, red: 4,violet: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //39
  {
    balls: {purple: 4, violet: 4,black: 4, green: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //40
  {
    balls: {blue: 4, black: 4, green: 4, orange: 4,violet: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //41
  {
    balls: {purple: 4, black: 4, violet: 4,blue: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //42
  {
    balls: {purple: 4, black: 4, green: 4, violet: 4,blue: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //43
  {
    balls: {purple: 4, black: 4, blue: 4, violet: 4,green: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //44
  {
    balls: {blue: 4, black: 4, green: 4,violet: 4, brown: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //45
  {
    balls: {purple: 4, black: 4, green: 4,violet: 4, blue: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //46
  {
    balls: {violet: 4,blue: 4, black: 4, green: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //47
  {
    balls: {purple: 4, black: 4,violet: 4, green: 4, blue: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //48
  {
    balls: {purple: 4,violet: 4, black: 4, green: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //49
  {
    balls: {purple: 4, violet: 4,black: 4, green: 4, orange: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  //50
  {
    balls: {purple: 4, black: 4, green: 4, orange: 4,violet: 4, red: 4,"#7C8363":4},
    maxStackSize: 4,
    numberOfStacks: 8,
  },
  // More levels...
];

export default levels;