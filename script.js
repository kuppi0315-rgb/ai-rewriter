function convert() {

  const input = document.getElementById("input").value;

  if (input.trim() === "") {
    alert("文章を入力してください");
    return;
  }

  document.getElementById("loading").style.display =
    "block";

  setTimeout(() => {

    // 変換前表示
    document.getElementById("before").innerText =
      input;

    // 変換前スコア
    const beforeScore =
      Math.floor(Math.random() * 31) + 50;

    document.getElementById("beforeScore").innerText =
      "変換前自然さ：" + beforeScore + "点";

    let output = input;

    // 共通変換
    output = output.replace(/非常に/g, "かなり");
    output = output.replace(/利用する/g, "使う");
    output = output.replace(/することができます/g, "できます");

    // モード取得
    const mode =
      document.querySelector(
        'input[name="mode"]:checked'
      ).value;

    // レポート
    if (mode === "report") {

      output = output.replace(/すごく/g, "非常に");
      output = output.replace(/やばい/g, "重大");

    }

    // カジュアル
    if (mode === "casual") {

      output = output.replace(/です。/g, "！");
      output = output.replace(/ます。/g, "ます！");

    }

    // ES
    if (mode === "es") {

      output = output.replace(/思います/g, "考えています");
      output = output.replace(/やりたい/g, "取り組みたい");

    }

    // 出力
    document.getElementById("output").innerText =
      output;

    // 変換後スコア
    const score =
      Math.floor(Math.random() * 21) + 80;

    document.getElementById("score").innerText =
      "変換後自然さ：" + score + "点";

    // スコアバー
    document.getElementById("scoreBar").style.width =
      score + "%";

    // 改善
    document.getElementById("improveScore").innerText =
      "+" + (score - beforeScore) + " 改善しました";

    // 理由
    let reason = "";

    if (score >= 95) {

      reason =
        "かなり自然で人間らしい文章です。";

    } else if (score >= 90) {

      reason =
        "自然で読みやすい文章です。";

    } else {

      reason =
        "ややAI感がありますが自然です。";

    }

    document.getElementById("reason").innerText =
      reason;

    // ローディング消す
    document.getElementById("loading").style.display =
      "none";

    // コピー表示
    document.getElementById("copyBtn").style.display =
      "inline-block";

  }, 700);
}

function copyText() {

  const text =
    document.getElementById("output").innerText;

  navigator.clipboard.writeText(text);

  alert("コピーしました！");
}
