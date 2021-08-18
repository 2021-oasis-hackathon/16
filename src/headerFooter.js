const container = document.querySelector("header");
const containerFooter = document.querySelector("footer");
  container.innerHTML = `
  <div class = "logo">
  <a href="index.html">
    <span>oasis</span>
    &nbsp;
    <span>mole</span>
  </a>
</div>
<ul class="nav">
  <li class="nav-item">
      <a class="nav-link" href="contest.html">공모전</a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="club.html">동아리</a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="study.html">스터디</a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="community.html">커뮤니티</a>
  </li>
</ul>
<!-- search bar -->
<form class="search__bar">
  <input type="text" placeholder="검색" required>
</form>
      `

containerFooter.innerHTML =`
<div>
<div><span>oasis</span>&nbsp;<span>mole</span> </div>
<span>당신이 원하는 이를 oasis mole에서 함께 찾아요</span>
</div>
`