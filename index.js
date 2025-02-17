export default {
    async fetch(request) {
      try {
        // 노션에서 받은 JSON 데이터 파싱
        const requestData = await request.json();
        const properties = requestData.data.properties;
  
        // 필요한 정보 추출
        const name = encodeURIComponent(properties["이름"].title[0].plain_text);
        const email = encodeURIComponent(properties["이메일"].email);
        const phone = encodeURIComponent(properties["전화번호"].phone_number);
  
        // 바티 AI에 전달할 GET 요청 URL
        const batiAI_URL = `https://webhook.site/d2196342-59c4-4343-adf5-1c793b20a0a4?이름=${name}&이메일=${email}&전화번호=${phone}`;
  
        // 바티 AI로 GET 요청 전송
        const batiResponse = await fetch(batiAI_URL, { method: "GET" });
  
        // 응답 반환
        return new Response("Data sent to Bati AI", { status: 200 });
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
  };
  
