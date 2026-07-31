const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('f_name').value.trim();
    const age = document.getElementById('f_age').value.trim();
    const phone = document.getElementById('f_phone').value.trim();
    const time = document.getElementById('f_time').value;
    const pickup = inquiryForm.querySelector('input[name="f_pickup"]:checked');
    const message = document.getElementById('f_message').value.trim();

    if (!pickup) {
      alert('픽업여부를 선택해주세요.');
      return;
    }

    const subject = `[아이로운태권도] 수업문의 - ${name}`;
    const body = [
      `이름: ${name}`,
      `나이: ${age}세`,
      `연락처: ${phone}`,
      `희망시간: ${time}`,
      `픽업여부: ${pickup.value}`,
      `전달사항: ${message || '(없음)'}`
    ].join('\n');

    const mailto = `mailto:kyungmin3458@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
