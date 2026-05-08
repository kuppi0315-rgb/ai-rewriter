function convert() {

  const input = document.getElementById("input").value;

  if (!input.trim()) {
    alert("文章を入力してください");
    return;
  }

  // ローディング表示
  document.getElementById("loading").style.display = "block";

  // 擬似変換処理
  setTimeout(() => {

    // 変換前
    document.getElementById("before").innerText = input;

    // 自然化処理（簡易）
    let output = input;

    output = output.replace(/です。/g, "です");
    output = output.replace(/ます。/g, "ます");
    output = output.replace(/非常に/g, "かなり");
    output = output.replace(/利用する/g, "使う");

    // 出力
    document.getElementById("output").innerText = output;

    // ローディング非表示
    document.getElementById("loading").style.display = "none";

    // コピーボタン表示
    document.getElementById("copyBtn").style.display = "inline-block";

  }, 700);
}

function copyText() {

  const text = document.getElementById("output").innerText;

  navigator.clipboard.writeText(text);

  alert("コピーしました！");
}
