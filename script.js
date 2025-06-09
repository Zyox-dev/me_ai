// const supabaseUrl = "https://iuecvdsuzxedppqxfrmu.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZWN2ZHN1enhlZHBwcXhmcm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzgyMTEsImV4cCI6MjA2NTA1NDIxMX0.rbwGs7dAGyDmZAFsP6bagoaMjxFTHZg-cAuC_W3nK3Q";
// const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// const API_KEY = "AIzaSyBTo9FBL2oWDSBjRPH1Kohvi7cCoKW296I"; // Replace with your real key
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// const systemPrompt = `You are Arnav Purohit — a 19-year-old CS, DS, and AI undergrad...`;

// let chatHistory = [];

// // ---------- AUTH ----------
// async function signUp() {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const { error } = await supabase.auth.signUp({ email, password });
//   alert(error ? error.message : "Signup successful, check your email.");
// }

// async function signIn() {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) return alert(error.message);
//   alert("Login successful");
//   loadChatHistory();
// }

// async function logout() {
//   await supabase.auth.signOut();
//   alert("Logged out");
//   document.getElementById("chat-box").innerHTML = "";
// }

// // ---------- CHAT ----------
// async function sendMessage() {
//   const inputField = document.getElementById("user-input");
//   const userText = inputField.value.trim();
//   if (!userText) return;

//   appendMessage("👾", userText, "user");
//   inputField.value = "";

//   const botReply = await getBotReply(userText);
//   appendMessage("🧠", botReply, "bot");
// }

// function appendMessage(avatar, text, role) {
//   const chatBox = document.getElementById("chat-box");
//   const messageDiv = document.createElement("div");
//   messageDiv.classList.add("chat-message", role);
//   messageDiv.innerHTML = `
//     <div class="avatar">${avatar}</div>
//     <div class="text">${text}</div>
//   `;
//   chatBox.appendChild(messageDiv);
//   chatBox.scrollTop = chatBox.scrollHeight;
//   saveMessage(role, text);
// }

// async function getBotReply(userInput) {
//   const messages = [];

//   if (chatHistory.length === 0) {
//     messages.push({ role: "user", parts: [{ text: systemPrompt }] });
//   }

//   chatHistory.forEach(entry => {
//     messages.push({ role: "user", parts: [{ text: entry.user }] });
//     messages.push({ role: "model", parts: [{ text: entry.bot }] });
//   });

//   messages.push({ role: "user", parts: [{ text: userInput }] });

//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ contents: messages })
//   });

//   const result = await response.json();
//   const botReply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 Failed to parse response.";

//   chatHistory.push({ user: userInput, bot: botReply });

//   return botReply;
// }

// // ---------- DB ----------
// async function saveMessage(role, text) {
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) return;

//   await supabase.from('chats').insert([
//     { user_id: user.id, role: role, message: text }
//   ]);
// }

// async function loadChatHistory() {
//   const { data: { user } } = await supabase.auth.getUser();
//   if (!user) return;

//   const { data, error } = await supabase
//     .from("chats")
//     .select("*")
//     .eq("user_id", user.id)
//     .order("created_at", { ascending: true });

//   if (error) return;

//   chatHistory = [];

//   data.forEach(chat => {
//     appendMessage(chat.role === "user" ? "👾" : "🧠", chat.message, chat.role);
//     if (chat.role === "user") {
//       chatHistory.push({ user: chat.message, bot: "" });
//     } else if (chatHistory.length > 0) {
//       chatHistory[chatHistory.length - 1].bot = chat.message;
//     }
//   });
// }
