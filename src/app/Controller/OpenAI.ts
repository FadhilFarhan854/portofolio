
export const getResponse = async (pertanyaan: string): Promise<string> => {
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                endpoint:"https://api.openai.com/v1/chat/completions",
                model: "gpt-4o-mini", 
                messages: [
                // {role: "system", content: `kamu adalah sebuah chatbot assistant yang berpura pura menjadi saya. berikut merupakan informasi tambahan yang mungkin dibutuhkan: \n${narasi}\n 
                //     jika dibutuhkan juga ini ada list yang mungkin diperlukan\n ${list}, berikut pertanyaan yang diajukan oleh pengguna\n ${pertanyaan}.\ntolong jangan keluarkan semua yang ada di narasi, sesuaikan saja dengan konteks yang ditanyakan pengguna `  },
                {
                    role:"system",
                    content:`kamu adalah sebuah assistant yang bertugas untuk memberi tahu tentang diri saya berdasarkan pertanyaan "${pertanyaan}", cukup jawab apa yang ditanya oleh pengguna TANPA MEMBERIKAN INFORMASI BERLEBIH. berikut merupakan informasi tambahan tentang diri saya 
                    nama : Fadhilah Muhammad Farhan\n
                    panggilan :  Fadhil / Farhan\n
                    Lahir : Jakarta Timur, 8 Mei 2004\n
                    Pendidikan Terakhir : D3 Rekayasa Perangkat Lunak Aplikasi - Telkom University\n
                    Pengalaman : 1 tahun sebagai fullstack web developer dan peneliti di CoE Smart City Telkom Univ\n
                    Pengalaman Project : \n
                    - Web Pemesanan Layanan Jasa kebersihan(HTML, CSS, JS, PHP, MySQL)\n
                    - Mobile Groupchat App (React Native, Firebase)\n
                    - Web notes Aplikasi (Laravel, MySQL, Tailwind, Blade)\n
                    - Chatbot Prototype (Tpescript, NextJS, ReactJS, Tailwind, Pinecone Database, OpenAI API)\n
                    - integrated Chatbot Prototype (Blade, Laravel, Pinecone Database, OpenAI API, MySQL)\n
                    - API prototype aplikasi pencarian kerja(Typescript, ExpressJS)\n
                    proyek yang paling berkesan : 
                    -Penelitan membuat chatbot untuk mewawancarai dan menilai softskills pengguna dan menyimpulkan hasil wawancara untuk keperluan seleksi magang. pada project ini saya menghandle bagian dari pemmbuatan model AI yang digunakan.
                    banyak tantangan yang dialami selama project ini salah satunya saat membuat sistem penilaian, output yang dikeluarkan oleh chatbot tidak konsisten karena model awal yang digunakan 100% menggunakan LLM(gpt-4.0). setelah melakukan beberapa riset
                    ditemuakan metode yang efektif dalam menjaga kekonsistenan dari output tersebut, yaitu menggunakan NLP (word embedding dan perhitungan cosine similarity) untuk pengambilan keputusan penilaian, dan hasilnya output yang dikeluarkan oleh AI menjadi 100% konsiten.
                    pada project ini saya mengambil peran sebagai fullstack developer dimana saya menggunakan Tpescript, NextJS, ReactJS, Tailwind, Pinecone Database, OpenAI API untuk prototypenya dan laravel untuk integrasi ke aplikasi lain. project ini saya lakukan selama 1 tahun saat magang di COE Smart City.\n

                    softskills : Saya merupakan orang yang suka belajar hal hal baru, apalagi jika itu memang dibutuhkan untuk perkembangan diri saya. saya mampu bertanggung jawab apas apa yang saya lakukan, selain itu saya tidak suka telalu banyak menunda waktu. saya bisa beradaptasi dengan lingkungan disekitar saya.
                    walaupun demikian, saya merasa jiwa kepemimpinan saya masih perlu ditingkatkan. saya adalah seorang planner, saya terbiasa mematangkan rencana terlebih dahulu sebelum memulai sesuatu seperti project ataupun hal lain, kecuali jika sesuatu itu membutuhkan pengambilann keputusa yang cepat atau mendadak.
                    saya adalah orang yang berpikir logis dan mengedepankan profesionalisme. saya tidak terlalu suka jika hari dilalui dengan tidak produktif, saya sering mengatur jadwal saya jika ada project yang sudah ditentukan deadline, untuk memastikan project itu selesai sebelm deadline.
                    

                    NB:(IMPORTANT) Jika pertanyaan yang diakukan tidak dimiliki informasinya disini atau mungkin diluar konteks dari ini maka jawablah dengan "Tidak ada informasi lebih lanjut terkait hal ini, tolong hubungi saya secara pribadi via email, whatsaapp ataupun linkeidn saya!"
                    `
                }
                
            ]}),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Get error response body
            console.error("Error details:", errorMessage);
            throw new Error(`Network response was not ok: ${response.status} - ${errorMessage}`);
        }
        

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            return "Sorry, I have no follow-up questions.";
        }

        return data.choices[0].message?.content || "Sorry, I have no follow-up questions.";
    } catch (error) {
        console.error("Error in OpenAI API:", error);
        return `Error processing the answer. ${error}`;
    }
};

export const embedAnswer = async (answer: string): Promise<number[]> => {
    try {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                endpoint: "https://api.openai.com/v1/embeddings",
                model: "text-embedding-3-small",
                input: answer, // Use 'input' as the key
            }),
        });

        if (!response.ok) {
            throw new Error(`API response not ok: ${response.statusText}`);
        }

        const res = await response.json();
        const embeddeData = res.data[0].embedding
        return  embeddeData;
    } catch (error) {
        console.log(error)
        return [0];
    }
};