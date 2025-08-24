const handleSubmit = async (e) => {
  e.preventDefault();
  setAnswer("Loading...");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (data.answer) {
      setAnswer(data.answer);
    } else {
      setAnswer("Error: No answer received from backend.");
    }
  } catch (error) {
    console.error("Error fetching answer:", error);
    setAnswer("Something went wrong. Please try again.");
  }
};
