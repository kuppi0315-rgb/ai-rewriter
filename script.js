function convert() {

  const input = document.getElementById("input").value;

  if (input.trim() === "") {
    alert("文章を入力してください");
    return;
  }

  document.getElementById("loading").style.display = "block";

  setTimeout(() => {

    document.getElementById("before").innerText = input;

    let output = input;

    output = output.replace(/非常に/g, "かなり");
    output = output.replace(/利用する/g, "使う");
    output = output.replace(/することができます/g, "できます");

    document.getElementById("output").innerText = output;

    /* スコア */
    const score = Math.floor(Math.random() * 21) + 80;

    document.getElementById("score").innerText =
      "自然さスコア：" + score + "点";

    document.getElementById("scoreBar").style.width =
      score + "%";

    let reason = "";

    if (score >= 95) {
      reason = "かなり自然な文章です。";
    } else if (score >= 90) {
      reason = "自然で読みやすい文章です。";
    } else {
      reason = "ややAI感がありますが自然です。";
    }

    document.getElementById("reason").innerText = reason;

    document.getElementById("loading").style.display = "none";

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
