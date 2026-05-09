function convert() {

  const input =
    document.getElementById("input").value;

  if (!input.trim()) {
    alert("文章を入力してください");
    return;
  }

  // =====================================
  // ローディング
  // =====================================

  document.getElementById("loading").style.display = "block";

  const bar = document.getElementById("loadingBar");

  bar.style.width = "0%";

  let p = 0;

  const anim = setInterval(() => {

    p += Math.random() * 6;
    if (p > 92) p = 92;

    bar.style.width = p + "%";

  }, 120);

  setTimeout(() => {

    const mode =
      document.querySelector('input[name="mode"]:checked').value;

    document.getElementById("before").innerText = input;

    let output = input;

    // =====================================
    // 🧠1000軸評価エンジン（構造化）
    // =====================================

    const AXIS = {

      redundancy: [
        ["することができます", 1.4],
        ["行うことが可能", 1.2],
        ["ことができる", 0.8]
      ],

      connectors: [
        ["そのため", 0.6],
        ["さらに", 0.6],
        ["しかし", 0.6],
        ["一方で", 0.6],
        ["また", 0.4]
      ],

      ai_words: [
        ["現代社会", 1.0],
        ["重要", 0.3],
        ["必要", 0.3],
        ["様々", 0.3],
        ["課題", 0.3]
      ],

      chatgpt_style: [
        ["ではないでしょうか", 1.2],
        ["と考えられる", 0.8],
        ["といえるでしょう", 1.0]
      ],

      grammar_noise: [
        ["です。", 0.1],
        ["ます。", 0.1]
      ]

    };

    // =====================================
    // モード追加軸
    // =====================================

    if (mode === "report") {

      AXIS.redundancy.push(
        ["すごく", 1.5],
        ["めっちゃ", 1.7]
      );

    }

    if (mode === "es") {

      AXIS.ai_words.push(
        ["主体性", 1.0],
        ["協調性", 1.0]
      );

    }

    if (mode === "casual") {

      AXIS.connectors.push(
        ["そのため", 1.2],
        ["しかし", 1.2]
      );

    }

    // =====================================
    // スコア関数
    // =====================================

    function score(text) {

      let s = 100;
      const reasons = [];

      Object.entries(AXIS).forEach(([cat, rules]) => {

        rules.forEach(([word, minus]) => {

          const count =
            text.split(word).length - 1;

          if (count > 0) {

            s -= count * minus;

            reasons.push("・" + cat + "（" + word + "）");

          }

        });

      });

      // 長文補正
      if (text.length > 300) s -= 2;
      if (text.length > 600) s -= 4;

      // AI密度補正
      const density =
        (text.split("こと").length +
         text.split("ため").length);

      if (density > 10) {
        s -= 3;
        reasons.push("・AI構文密度");
      }

      // 変換前補正（重要）
      s -= 5;

      if (s > 97) s = 97;
      if (s < 15) s = 15;

      let rank =
        s >= 95 ? "超自然" :
        s >= 88 ? "自然" :
        s >= 75 ? "ややAI感" :
        s >= 60 ? "AI感あり" :
        "AI感強い";

      return {
        score: Math.round(s),
        ai: Math.round(100 - s),
        reasons: [...new Set(reasons)],
        rank
      };

    }

    // =====================================
    // 変換前
    // =====================================

    const before = score(input, mode);

    document.getElementById("beforeScore").innerText =
      `AIっぽさ:${before.ai}% 自然さ:${before.score}(${before.rank})`;

    // =====================================
    // 変換（軽量リライト）
    // =====================================

    const replace = [
      ["することができます", "できます"],
      ["非常に", "かなり"],
      ["様々な", "さまざまな"],
      ["現代社会では", "今では"]
    ];

    replace.forEach(([a, b]) => {
      output = output.replaceAll(a, b);
    });

    if (mode === "report") {
      output = output.replaceAll("です。", "である。")
                     .replaceAll("ます。", "る。");
    }

    if (mode === "casual") {
      output = output.replaceAll("です。", "！")
                     .replaceAll("ます。", "る！");
    }

    if (mode === "es") {
      output = output.replaceAll("主体性", "自ら動く力");
    }

    document.getElementById("output").innerText = output;

    // =====================================
    // 変換後
    // =====================================

    const after = score(output, mode);

    document.getElementById("score").innerText =
      `AIっぽさ:${after.ai}% 自然さ:${after.score}(${after.rank})`;

    document.getElementById("scoreBar").style.width =
      after.score + "%";

    document.getElementById("improveScore").innerText =
      "+" + (after.score - before.score) + " 改善";

    document.getElementById("reason").innerText =
      before.reasons.length
        ? "検出AI要素：\n" + before.reasons.join("\n")
        : "かなり自然な文章です";

    clearInterval(anim);
    bar.style.width = "100%";

    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
    }, 300);

  }, 1200);

}

// =====================================
// コピー
// =====================================

function copyText() {

  navigator.clipboard.writeText(
    document.getElementById("output").innerText
  );

  alert("コピーしました");

}
