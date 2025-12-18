
    document.addEventListener("DOMContentLoaded", () => {
  injectVisitorTable();
  });
    function injectVisitorTable() {
      const main = document.createElement('main');
      main.id = "visitorMain";

      Object.assign(main.style, {
        display: "none",              
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
      });

      // Inject inline style directly into div
      const tableWrapperStyle = `
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      `;

      main.innerHTML = `
        <div id="tableWrapper" style="${tableWrapperStyle}">
          <table id="visitorTable">
            <thead>
              <tr>
                <th class="row-number">#</th>
                <th>IP Address<br><input class="filter-input" data-col="1" placeholder="IP" /></th>
                <th>Visit Time<br><input class="filter-input" data-col="2" placeholder="Time" /></th>
                <th>Method<br><input class="filter-input" data-col="3" placeholder="Method" /></th>
                <th>Referrer<br><input class="filter-input" data-col="4" placeholder="Referrer" /></th>
                <th>Device<br><input class="filter-input" data-col="5" placeholder="Device" /></th>
                <th>OS<br><input class="filter-input" data-col="6" placeholder="OS" /></th>
                <th>Browser<br><input class="filter-input" data-col="7" placeholder="Browser" /></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;

      const container = document.getElementById("mainContent") || document.body;
      container.appendChild(main);
    }

    const API_BASE = "https://sangeeth2314105883websitecounter.azurewebsites.net/api";

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'アァイィウエカキクケコサシスセソタチツテトナニヌネノハヒフヘホ അ ആ ഇ ഈ ഉ ഊ ക ഖ ഗ ഘ ങ യ ര ല വ ശ ഷ സ ഹ அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ய ர ல வ ழ ள ற ன 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = index * fontSize;
        ctx.fillText(text, x, y * fontSize);
        drops[index] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }

    setInterval(drawMatrix, 33);
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    function showToast(message) {
      const container = document.getElementById("toastContainer");
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    async function login() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const loginSpinner = document.getElementById("loginspinner");

      if (!username || !password) return showToast("Please enter username and password");

      loginSpinner.style.display = "block";
      try {
        const response = await fetch(`${API_BASE}/validateLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success && result.token) {
          localStorage.setItem("authToken", result.token);
          document.getElementById("container").style.display = "none";
          document.getElementById("signOutBtn").style.display = "block";
          document.querySelector("main").style.display = "flex";
          await loadLogs();
          document.getElementById("visitorTable").style.display = "table";
        } else {
          showToast("Invalid credentials!");
        }
      } catch (error) {
        console.error("Login error:", error);
        showToast("Login failed. Please try again later.");
      } finally {
        loginSpinner.style.display = "none";
      }
    }

    function signOut() {
      localStorage.removeItem("authToken");
      location.reload();
    }

    async function loadLogs() {
      const loaddb = document.getElementById("loaddb");
      loaddb.style.display = "block";

      try {
        const token = localStorage.getItem("authToken");
        if (!token) return showToast("Unauthorized access");
        const res = await fetch(`${API_BASE}/getSecureDataPF`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        const tbody = document.querySelector("#visitorTable tbody");
        tbody.innerHTML = "";

        if (!data.length) {
          const row = document.createElement("tr");
          row.innerHTML = `<td colspan="8" style="text-align:center;">No data available</td>`;
          tbody.appendChild(row);
        } else {
          data.forEach((visitor, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td class="row-number">${index + 1}</td>
              <td>${(visitor.IpAddress || '').split(":")[0]}</td>
              <td>${visitor.VisitTime || ''}</td>
              <td>${visitor.Method || ''}</td>
              <td>${visitor.Referer || ''}</td>
              <td>${visitor.DeviceType || ''}</td>
              <td>${visitor.OS || ''}</td>
              <td>${visitor.Browser || ''}</td>
            `;
            tbody.appendChild(row);
          });
          
        }
      } catch (error) {
        console.error("Error loading visitor logs:", error);
        showToast("Failed to load visitor data");
      } finally {
        loaddb.style.display = "none";
      }

        document.querySelectorAll(".filter-input").forEach(input => {
          input.addEventListener("keyup", () => {
            const colIndex = parseInt(input.getAttribute("data-col"));
            const filterValue = input.value.toLowerCase();
            const rows = document.querySelectorAll("#visitorTable tbody tr");

            rows.forEach(row => {
              const cell = row.cells[colIndex];
              if (cell) {
                const cellText = cell.textContent.toLowerCase();
                row.style.display = cellText.includes(filterValue) ? "" : "none";
              }
            });
          });
        });

    }

    window.onload = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        document.getElementById("container").style.display = "none";
        document.getElementById("signOutBtn").style.display = "block";
        document.querySelector("main").style.display = "flex";
        loadLogs();
        document.getElementById("visitorTable").style.display = "table";
      }
    };
      document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    });
    