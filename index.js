export default {
  async fetch(request) {
    // CORS 헤더 처리 (옵션, 다른 서비스와 통신할 때 필요할 수 있음)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      });
    }

    if (request.method === "POST") {
      try {
        const requestData = await request.json(); // JSON 파싱

        // 노션에서 받은 데이터
        const name = requestData.data.properties.이름.title[0].plain_text;
        const email = requestData.data.properties.이메일.email;
        const phone = requestData.data.properties.전화번호.phone_number;

        // 바티 AI로 전달할 GET 요청 URL을 생성
        const batikakaoUrl = new URL("https://webhook.site/d2196342-59c4-4343-adf5-1c793b20a0a4");

        // 쿼리 문자열 추가 (URL 인코딩 필요)
        batikakaoUrl.searchParams.append("이름", name);
        batikakaoUrl.searchParams.append("이메일", email);
        batikakaoUrl.searchParams.append("전화번호", phone);

        // 바티 AI로 GET 요청을 보냄
        const response = await fetch(batikakaoUrl.toString(), {
          method: "GET",
        });

        // 성공적으로 요청이 완료되었으면, 성공 응답을 반환
        if (response.ok) {
          return new Response("Success", { status: 200 });
        } else {
          return new Response("Error sending to Batikakao", { status: 500 });
        }
      } catch (error) {
        // 에러가 발생했을 경우 에러 메시지 반환
        return new Response("Error processing the request", { status: 400 });
      }
    }

    return new Response("Only POST requests allowed", { status: 405 });
  },
};
