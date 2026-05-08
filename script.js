window.convert = function () {
  runConvert(1);
};

window.strongConvert = function () {
  runConvert(2);
};

function runConvert(level) {

  let text = document.getElementById("input").value;
  let mode = document.getElementById("mode").value;

  document.getElementById("loading").style.display = "block";
  document.getElementById("before").innerText = text;

  setTimeout(() => {

    let converted = text;

    const connectives = {
      "したがって": "",
      "さらに": "また",
      "そのため": "そのため",
      "そして": "また",
      "また、": "",
      "一方で": "一方",
      "加えて": "また"
    };

    for (let key in connectives) {
      converted = converted.replace(new RegExp(key, "g"), connectives[key] ?? "");
    }

    converted = converted
      .replace(/であるため/g, "なので")
      .replace(/必要である/g, "必要だ")
      .replace(/重要である/g, "大切だ")
      .replace(/考えられる/g, "考える");

    if (level === 2) {
      converted = converted
        .replace(/という/g, "")
        .replace(/こと/g, "")
        .replace(/である/g, "だ");
    }

    converted = converted.replace(/。/g, "。\n");

    if (mode === "report") {
      converted = converted.replace(/です/g, "である");
    }

    if (mode === "casual") {
      converted = converted.replace(/である/g, "だ");
    }

    document.getElementById("output").innerText = converted;

    let score = calcScore(text, converted);
    document.getElementById("score").innerText =
      "自然さスコア: " + score;

    document.getElementById("scoreBar").style.width = score + "%";

    document.getElementById("reason").innerText =
      generateReason(text);

    document.getElementById("loading").style.display = "none";

  }, 300);
}

function calcScore(original, converted) {
  let score = 100;

  const patterns = [
    /したがって/g,
    /さらに/g,
    /である/g,
    /重要である/g,
    /必要である/g
  ];

  patterns.forEach(p => {
    const m = original.match(p);
    if (m) score -= m.length * 7;
  });

  if (converted.length > 400) score -= 10;

  return Math.max(0, score);
}

function generateReason(text) {
  let reasons = [];

  if (/したがって|さらに|そのため/.test(text)) {
    reasons.push("接続詞が多いです");
  }

  if (/である/.test(text)) {
    reasons.push("硬い表現が多いです");
  }

  if (text.length > 200) {
    reasons.push("文章がやや長いです");
  }

  return reasons.length ? "改善ポイント: " + reasons.join(" / ") : "自然な文章です";
}

window.copyText = function () {
  const text = document.getElementById("output").innerText;
  navigator.clipboard.writeText(text);
  alert("コピーしました！");
};
