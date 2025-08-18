export class BaoBaoCipher {
  private static readonly BAOBAO_MAP: Record<string, string> = {
    A: "软软",
    B: "糯糯",
    C: "酥酥",
    D: "脆脆",
    E: "滑滑",
    F: "嫩嫩",
    G: "绵绵",
    H: "弹弹",
    I: "润润",
    J: "蓬蓬",
    K: "沙沙",
    L: "茸茸",
    M: "黏黏",
    N: "松松",
    O: "柔柔",
    P: "腻腻",
    Q: "稀稀",
    R: "稠稠",
    S: "干干",
    T: "湿湿",
    U: "细细",
    V: "粗粗",
    W: "焦焦",
    X: "烫烫",
    Y: "鼓鼓",
    Z: "油油",
    a: "香香",
    b: "甜甜",
    c: "酸酸",
    d: "苦苦",
    e: "咸咸",
    f: "淡淡",
    g: "浓浓",
    h: "鲜鲜",
    i: "麻麻",
    j: "辣辣",
    k: "涩涩",
    l: "冰冰",
    m: "凉凉",
    n: "暖暖",
    o: "热热",
    p: "亮亮",
    q: "晶晶",
    r: "闪闪",
    s: "圆圆",
    t: "方方",
    u: "胖胖",
    v: "小小",
    w: "厚厚",
    x: "薄薄",
    y: "扁扁",
    z: "白白",
    "0": "香气四溢",
    "1": "回味无穷",
    "2": "口感丰富",
    "3": "甘甜爽口",
    "4": "味道香甜",
    "5": "鲜美多汁",
    "6": "香气浓郁",
    "7": "外酥里嫩",
    "8": "味道醇厚",
    "9": "味道浓郁",
    "+": "色泽金黄",
    "/": "香气扑鼻",
    "=": "味道独特",
  };

  private static readonly DECODE_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(BaoBaoCipher.BAOBAO_MAP).map(([k, v]) => [v, k]),
  );

  private static readonly PREFIX_BODY = "宝宝你是一个";
  private static readonly SUFFIX = "的小蛋糕";
  private static readonly MOD_BASE = 20;
  private static readonly MIN_A_COUNT = 5;

  private static calculateChecksum(coreContent: string): number {
    const checksumValue = Array.from(coreContent).reduce(
      (sum, char) => sum + char.charCodeAt(0),
      0,
    );
    return (checksumValue % BaoBaoCipher.MOD_BASE) + BaoBaoCipher.MIN_A_COUNT;
  }

  static encode(text: string): string {
    try {
      const utf8Bytes = new TextEncoder().encode(text);
      const b64String = btoa(String.fromCharCode(...utf8Bytes));

      const encodedCore = Array.from(b64String)
        .map((char) => BaoBaoCipher.BAOBAO_MAP[char])
        .join("");

      const numA = BaoBaoCipher.calculateChecksum(encodedCore);
      const prefixA = "啊".repeat(numA);

      return `${prefixA}${BaoBaoCipher.PREFIX_BODY}${encodedCore}${BaoBaoCipher.SUFFIX}`;
    } catch (error) {
      return "编码失败";
    }
  }

  static decode(encodedText: string): string {
    const pattern = /^(啊+)(宝宝你是一个)(.+)(的小蛋糕)$/;
    const match = pattern.exec(encodedText);

    if (!match) {
      return "解码失败";
    }

    const [, aBlock, , encodedCore] = match;

    const foundNumA = aBlock.length;
    const expectedNumA = BaoBaoCipher.calculateChecksum(encodedCore);

    if (foundNumA !== expectedNumA) {
      return "解码失败";
    }

    if (encodedCore.length % 2 !== 0) {
      return "解码失败";
    }

    try {
      let b64String = "";
      let i = 0;
      while (i < encodedCore.length) {
        const fourCharChunk = encodedCore.slice(i, i + 4);
        if (fourCharChunk in BaoBaoCipher.DECODE_MAP) {
          b64String += BaoBaoCipher.DECODE_MAP[fourCharChunk];
          i += 4;
          continue;
        }

        const twoCharChunk = encodedCore.slice(i, i + 2);
        if (twoCharChunk in BaoBaoCipher.DECODE_MAP) {
          b64String += BaoBaoCipher.DECODE_MAP[twoCharChunk];
          i += 2;
          continue; 
        }

        return "解码失败";
      }

      const binaryString = atob(b64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new TextDecoder().decode(bytes);
    } catch (error) {
      return "解码失败";
    }
  }
}