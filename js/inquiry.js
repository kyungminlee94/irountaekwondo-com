const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    try {
      const response = await fetch(inquiryForm.action, {
        method: 'POST',
        body: new FormData(inquiryForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        inquiryForm.reset();
        inquiryForm.querySelectorAll('.form-row, .form-consent').forEach(el => { el.style.display = 'none'; });
        submitBtn.style.display = 'none';
        successMsg.hidden = false;
      } else {
        throw new Error('submit failed');
      }
    } catch (err) {
      alert('전송에 실패했습니다. 전화(010-7633-8244)로 문의해 주세요.');
      submitBtn.disabled = false;
      submitBtn.textContent = '상담 신청하기';
    }
  });
}
