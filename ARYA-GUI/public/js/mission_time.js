function updateTime() {
    const now = new Date();
  
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
  
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
  
  setInterval(updateTime, 1000); // Update every second
  updateTime(); // Initial call to display the time immediately

  function updateCount(){
   let count=0
    document.getElementById('count').textContent=count;
    count++;
    
  }
  count.innerHTML=count;
  setInterval(updateCount,1000);
  updateCount();