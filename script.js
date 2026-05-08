function convert() {

  const input =
    document.getElementById("input").value;

  if (input.trim() === "") {

    alert("文章を入力してください");

    return;
  }

  // =====================================
  // ローディング開始
  // =====================================

  document.getElementById("loading").style.display =
    "block";

  const loadingBar =
    document.getElementById("loadingBar");

  loadingBar.style.width = "0%";

  let progress = 0;

  const loadingAnimation = setInterval(() => {

    progress += Math.random() * 8;

    if (progress > 90) {

      progress = 90;
    }

    loadingBar.style.width =
      progress + "%";

  }, 120);

  setTimeout(() => {

    document.getElementById("before").innerText =
      input;

    const mode =
      document.querySelector(
        'input[name="mode"]:checked'
      ).value;

    let output = input;

    // =====================================
    // AIっぽさ採点関数
    // =====================================

    function calculateScore(text, mode) {

      let score = 100;

      const reasons = [];

      let patterns = [];

      // =====================================
      // 共通
      // =====================================

      patterns.push(
        {
          word: "することができます",
          minus: 1.2,
          reason: "冗長表現"
        },

        {
          word: "することが可能",
          minus: 1.0,
          reason: "AIっぽい表現"
        },

        {
          word: "そのため",
          minus: 0.4,
          reason: "接続詞が多い"
        },

        {
          word: "さらに",
          minus: 0.4,
          reason: "接続詞が多い"
        },

        {
          word: "しかし",
          minus: 0.4,
          reason: "接続詞が多い"
        },

        {
          word: "非常に",
          minus: 0.2,
          reason: "硬い表現"
        },

        {
          word: "様々",
          minus: 0.2,
          reason: "AI頻出語"
        },

        {
          word: "現代社会",
          minus: 0.7,
          reason: "テンプレ導入"
        },

        {
          word: "重要",
          minus: 0.2,
          reason: "抽象表現"
        },

        {
          word: "必要",
          minus: 0.2,
          reason: "抽象表現"
        }
      );

      // =====================================
      // レポート
      // =====================================

      if (mode === "report") {

        patterns.push(

          {
            word: "すごく",
            minus: 1.2,
            reason: "口語表現"
          },

          {
            word: "めっちゃ",
            minus: 1.5,
            reason: "カジュアルすぎる"
          },

          {
            word: "やばい",
            minus: 1.7,
            reason: "不適切表現"
          },

          {
            word: "かなと思う",
            minus: 1.0,
            reason: "曖昧表現"
          }

        );
      }

      // =====================================
      // ES
      // =====================================

      if (mode === "es") {

        patterns.push(

          {
            word: "コミュニケーション能力",
            minus: 0.8,
            reason: "抽象的"
          },

          {
            word: "主体性",
            minus: 0.8,
            reason: "抽象的"
          },

          {
            word: "協調性",
            minus: 0.8,
            reason: "抽象的"
          },

          {
            word: "成長できました",
            minus: 0.7,
            reason: "AI ES感"
          }

        );
      }

      // =====================================
      // カジュアル
      // =====================================

      if (mode === "casual") {

        patterns.push(

          {
            word: "そのため",
            minus: 1.0,
            reason: "会話っぽくない"
          },

          {
            word: "しかし",
            minus: 1.0,
            reason: "硬すぎる"
          },

          {
            word: "さらに",
            minus: 0.8,
            reason: "説明感が強い"
          },

          {
            word: "必要があります",
            minus: 1.0,
            reason: "AIっぽい"
          },

          {
            word: "ではないでしょうか",
            minus: 1.0,
            reason: "ChatGPT感"
          }

        );
      }

      // =====================================
      // 減点処理
      // =====================================

      patterns.forEach(pattern => {

        const count =
          text.split(pattern.word).length - 1;

        if (count > 0) {

          score -= count * pattern.minus;

          reasons.push(
            "・" +
            pattern.reason +
            "（" +
            pattern.word +
            "）"
          );
        }

      });

      // =====================================
      // 最低・最高
      // =====================================

      if (score > 97) {

        score = 97;
      }

      if (score < 35) {

        score = 35;
      }

      return {
        score: Math.round(score),
        reasons: [...new Set(reasons)]
      };

    }

    // =====================================
    // 変換前スコア
    // =====================================

    const beforeData =
      calculateScore(input, mode);

    document.getElementById("beforeScore").innerText =
      "変換前自然さ：" +
      beforeData.score +
      "点";

    // =====================================
    // 共通変換
    // =====================================

    const commonReplacements = [

      ["することができます", "できます"],
      ["することが可能です", "できます"],
      ["利用する", "使う"],
      ["実施する", "行う"],
      ["確認する", "見る"],
      ["把握する", "理解する"],
      ["存在する", "ある"],
      ["発生する", "起こる"],
      ["向上する", "上がる"],
      ["低下する", "下がる"],
      ["非常に", "かなり"],
      ["様々な", "さまざまな"]

    ];

    commonReplacements.forEach(pair => {

      output =
        output.replaceAll(pair[0], pair[1]);

    });

    // =====================================
    // 標準
    // =====================================

    if (mode === "normal") {

      output =
        output.replaceAll(
          "そのため、",
          "だから、"
        );

      output =
        output.replaceAll(
          "さらに、",
          "あと、"
        );

      output =
        output.replaceAll(
          "現代社会では",
          "今では"
        );

    }

    // =====================================
    // レポート
    // =====================================

    if (mode === "report") {

      output =
        output.replaceAll(
          "すごく",
          "非常に"
        );

      output =
        output.replaceAll(
          "めっちゃ",
          "非常に"
        );

      output =
        output.replaceAll(
          "でも",
          "しかし"
        );

      output =
        output.replaceAll(
          "だから",
          "そのため"
        );

      output =
        output.replaceAll(
          "です。",
          "である。"
        );

      output =
        output.replaceAll(
          "ます。",
          "る。"
        );

    }

    // =====================================
    // ES
    // =====================================

    if (mode === "es") {

      output =
        output.replaceAll(
          "コミュニケーション能力",
          "相手の意見を整理しながら対話する力"
        );

      output =
        output.replaceAll(
          "主体性",
          "自分から課題を見つけ行動する姿勢"
        );

      output =
        output.replaceAll(
          "協調性",
          "周囲と連携しながら進める力"
        );

      output =
        output.replaceAll(
          "成長できました",
          "以前より対応できるようになりました"
        );

    }

    // =====================================
    // カジュアル
    // =====================================

    if (mode === "casual") {

      output =
        output.replaceAll(
          "そのため、",
          "だから、"
        );

      output =
        output.replaceAll(
          "しかし、",
          "でも、"
        );

      output =
        output.replaceAll(
          "さらに、",
          "あと、"
        );

      output =
        output.replaceAll(
          "必要があります",
          "した方がいい"
        );

      output =
        output.replaceAll(
          "ではないでしょうか",
          "だと思う"
        );

      output =
        output.replaceAll(
          "です。",
          "！"
        );

      output =
        output.replaceAll(
          "ます。",
          "る！"
        );

    }

    // =====================================
    // 出力
    // =====================================

    document.getElementById("output").innerText =
      output;

    // =====================================
    // 変換後スコア
    // =====================================

    const afterData =
      calculateScore(output, mode);

    document.getElementById("score").innerText =
      "変換後自然さ：" +
      afterData.score +
      "点";

    document.getElementById("scoreBar").style.width =
      afterData.score + "%";

    // =====================================
    // 改善量
    // =====================================

    const improve =
      afterData.score - beforeData.score;

    document.getElementById("improveScore").innerText =
      "+" +
      improve +
      " 改善しました";

    // =====================================
    // 理由表示
    // =====================================

    if (beforeData.reasons.length > 0) {

      document.getElementById("reason").innerText =
        "検出されたAIっぽさ：\n" +
        beforeData.reasons.join("\n");

    } else {

      document.getElementById("reason").innerText =
        "かなり自然な文章です！";
    }

    // =====================================
    // ローディング終了
    // =====================================

    clearInterval(loadingAnimation);

    loadingBar.style.width = "100%";

    setTimeout(() => {

      document.getElementById("loading").style.display =
        "none";

    }, 300);

    // =====================================
    // コピー表示
    // =====================================

    document.getElementById("copyBtn").style.display =
      "inline-block";

  }, 1800);
}

function copyText() {

  const text =
    document.getElementById("output").innerText;

  navigator.clipboard.writeText(text);

  alert("コピーしました！");
}
