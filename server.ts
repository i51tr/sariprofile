import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Sari Smart Energy & Electrical Protection System" });
});

// Sari AI Electrical & Energy Consultant Endpoint
app.post("/api/sari-ai", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    const systemInstruction = `
أنت «مستشار ساري الذكي» (Sari AI Smart Assistant)، المهندس التقني والكهربائي المعتمد لمنصة ومشروع «ساري» (Sari) في المملكة العربية السعودية.
مشروع «ساري» هو الجيل المتقدم من إدارة الطاقة، متفوقاً على مجرد قراءة الاستهلاك ليجمع بقوة استثنائية بين ركيزتين متكاملتين:
1) الحماية الكهربائية الفائقة والأمان الاستباقي (Superior Electrical Protection):
   - كشف الالتماسات الكهربائية الدقيقة (Micro-Arc Faults) والتسريب الأرضي قبل اندلاع أي شرارة أو حريق.
   - مراقبة درجات حرارة القواطع واللوحة الرئيسية وحمايتها من الانصهار أو التحميل الزائد.
   - كشف تذبذب الجهد (Voltage Surges & Spikes) وحماية الأجهزة الحساسة (مكيفات إنفيرتر، إلكترونيات، شواحن سيارات).
   - التنبؤ بتهالك كابلات التوصيل أو مواتير الأجهزة قبل تلفها.
   - فصل استباقي ذكي أو تنبيه فوري عبر التطبيق والرسائل العاجلة.
   - "وضع حراسة ساري" أثناء النوم أو السفر (Night & Travel Guard).

2) الترشيد الذكي للاستهلاك وخفض الفاتورة (Consumption Optimization & Cost Saving):
   - قراءة لحظية بالريال السعودي وبدقة عالية لكل جهاز على حدة بناءً على بصمة التردد الكهربائي (NILM).
   - تطبيق شرائح الكهرباء السعودية الرسمية (الشريحة السكنية الأولى: 18 هللة حتى 6,000 ك.و.س، والشريحة الثانية: 30 هللة لما زاد).
   - تنبؤ دقيق بقيمة الفاتورة لنهاية الشهر وتوجيهات عملية لتجنب الانتقال للشريحة الثانية.
   - تقديم خطط تحسين وعادات تشغيل ذكية للمكيفات (24 درجة مئوية توفر 10-15%)، السخانات، والمطابخ.

إرشادات إجابتك:
- تحدث بلغة عربية احترافية، راقية ومطمئنة، بطابع هندسي سعودي معاصر.
- اربط دائماً بين نصائح الأمان والحماية وبين التوفير المالي بالريال.
- اذكر مميزات جهاز ساري الذكي وكيف يركب في 30 دقيقة بدون تكسير في لوحة القواطع الرئيسية.
- قدم نصائح وأرقاماً وحلولاً قابلة للتطبيق مباشرة.
- نسق الإجابة بنقاط واضحة وخطوات عملية مريحة للقراءة.
`;

    if (ai) {
      // Use official Gemini 3.8 Flash model
      const contentsPayload = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const h of history.slice(-6)) {
          contentsPayload.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.content }],
          });
        }
      }
      contentsPayload.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contentsPayload,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const reply = response.text || "أهلاً بك! في ساري، نسهر على حماية شبكتك الكهربائية وترشيد كل ريال في فاتورتك.";
      return res.json({ reply, source: "gemini" });
    }

    // High quality contextual fallback if API key is not yet set
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (lower.includes("فاتور") || lower.includes("مكيف") || lower.includes("توفير") || lower.includes("ترشيد") || lower.includes("ريال")) {
      fallbackReply = `مرحباً بك! نظام ساري يساعدك في خفض فاتورة الكهرباء بنسبة تصل إلى 35-40% من خلال الركيزتين:
1. **المكيفات (تستهلك 60-70% من الفاتورة صيفاً):** ساري يتعرف على بصمة كل مكيف في منزلك، وينبهك إذا كان الضاغط (الكمبروسر) يعاني من حمل زائد، مع إرشادك لضبط الحرارة على 24° مئوية مما يمنع تجاوز الشريحة الأولى (18 هللة).
2. **مراقبة الشريحة بالريال اللحظي:** ساري يحسب عداد استهلاكك التراكمي، وينبهك قبل دخول شريحة الـ 30 هللة بـ 5 أيام، مقترحاً جدول تشغيل يضمن ثبات الفاتورة.
3. **كشف الهدر الخفي:** ينبهك التطبيق إذا تركت أجهزة تستهلك طاقة وضع الاستعداد (Vampire Draw) أو في حال عمل السخانات لساعات غير ضرورية.`;
    } else if (lower.includes("حماي") || lower.includes("التماس") || lower.includes("حريق") || lower.includes("فولت") || lower.includes("امان") || lower.includes("أمان")) {
      fallbackReply = `أهلاً بك! منظومة الحماية الاستباقية هي الفارق الجوهري الذي يتميز به «ساري»:
1. **كشف الالتماسات الكهربائية الدقيقة (Micro-Arc Faults):** تلتقط حساسات ساري الترددات غير الطبيعية الناتجة عن تآكل الأسلاك في الجدران قبل تحولها لشرر أو حريق بفضل الذكاء الاصطناعي.
2. **فحص حرارة القواطع واللوحة:** حساس حراري مستمر يرصد أي سخونة غير معتادة على القاطع الرئيسي أو الفرعي.
3. **حماية من تذبذب الجهد (Voltage Surges):** حماية للأجهزة الغالية كشواحن السيارات والمكيفات الحديثة من انخفاض أو ارتفاع الفولتية عن 220-240V.
4. **وضع حراسة السفر والنوم:** تفعيل مراقبة مكثفة مع إشعارات فورية على جوالك في حال حدوث أي نشاط كهربائي غير طبيعي.`;
    } else if (lower.includes("تركيب") || lower.includes("تكسير") || lower.includes("كيف يعمل") || lower.includes("سعر") || lower.includes("باقة")) {
      fallbackReply = `يسعدنا استفسارك عن تركيب جهاز ساري:
- **تركيب سهل بدون تكسير:** يتم تركيب جهاز ساري المدمج داخل لوحة التوزيع الكهربائية الحالية بواسطة مهندس معتمد في أقل من 30 دقيقة، مع مجسات حساسة دون قطع أي أسلاك رئيسية.
- **معتمد وآمن:** متوافق مع كود البناء السعودي ومعايير هيئة المواصفات والمقاييس (SASO).
- **الباقات:** نوفر باقة الشقق، باقة الفلل المستقلة (الأكثر طلباً)، وباقة الأعمال للمباني والمصانع، وكل باقة تشمل الجهاز، التركيب المجاني، وتطبيق ساري مدى الحياة وضمان 5 سنوات.`;
    } else {
      fallbackReply = `أهلاً بك مع «مستشار ساري الذكي»! 
أنا هنا لمساعدتك في كل ما يتعلق بـ **حماية لوحة منزلك الكهربائية من المخاطر والالتماسات** و**ترشيد استهلاك الكهرباء وخفض الفاتورة بالريال**.
يمكنك سؤالي عن:
• كيف تحمي أجهزتك ومكيفاتك من التلف والحرائق؟
• كم ستوفر شهرياً من خلال كشف الهدر الذكي؟
• كيفية تركيب جهاز ساري في لوحة التوزيع دون تكسير.`;
    }

    return res.json({ reply: fallbackReply, source: "sari_expert" });
  } catch (error) {
    console.error("Sari AI error:", error);
    return res.status(500).json({
      error: "حدث خطأ أثناء معالجة الطلب",
      reply: "نعتذر عن التأخير المؤقت. يمكنك الاستفسار عن باقات ساري أو تجربة حاسبة التوفير والحماية بالأعلى!",
    });
  }
});

// Production / Development Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ Sari Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
