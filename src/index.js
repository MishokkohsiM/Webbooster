

const application = document.getElementById('application');

const url = 'http://localhost:8000/api/'

const productComponent = (img_, name_, price_) => {
  const div = document.createElement('div');
  const button = document.createElement('div');
  const img = document.createElement('img');
  const text = document.createElement('div');
  const price = document.createElement('div');
  img.src = `${img_}`;
  img.className = 'img';
  button.className = 'button';
  button.innerHTML += `<div style="display: table-cell; vertical-align: middle; font-size: 20px">купить</div>`;
  button.addEventListener('click', () => {
    document.getElementById('my_modal').style.display = 'flex';
  });
  text.textContent = `${name_}`;
  text.className = 'text';
  const arr = price_.split('');
  const k = arr.length % 3;
  arr.forEach((p, index) => {
    if (index === k) {
      price.textContent += ' ';
    }
    if ((index - k) % 3 === 0) {
      price.textContent += ' ';
    }
    price.textContent += `${p}`;
  })
  price.innerHTML += `<img src="./static/images/ruble.png" style="width: 40px; height: 26px">`
  price.className = 'price';

  div.appendChild(img);
  div.appendChild(text);
  div.appendChild(price);
  div.appendChild(button);
  div.className = 'container';
  return div;
}

const modal = () => {
  const div = document.createElement('div');
  const result = `  <div id="my_modal" class="modal">
                      <div class="modal_content">
                        <div>
                            <span class="close_modal_window" onclick="addEventListener('click', () => {
                                document.getElementById('my_modal').style.display = 'none';
                            })">×</span>
                        </div>
                        <div class="input_content">
                          Имя:<br/>
                          <input id="Name" class="input"> 
                          Телефон:<br/>
                          <input id="Mobile" class="input">
                          Email:<br/>
                          <input id="Email" class="input">
                          Товар:<br/>
                          <input id="Product" class="input">
                          <div class="button" onclick="addEventListener('click', () => {
                            const name = document.getElementById('Name').value;
                            const mobile = document.getElementById('Mobile').value;
                            const email = document.getElementById('Email').value;
                            const product = document.getElementById('Product').value;
                            const body = {
                              name,
                              mobile,
                              email,
                              product,
                            }
                            fetch('http://localhost:8000/api/sent-mail/', {
                              method: 'POST',
                              mode: 'cors',
                              credentials: 'include',
                              headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                              },
                              body: JSON.stringify(body),
                            })
                            .then(result => result.json())
                            .then(result => {
                              console.log(result);
                            })
                           })">
                            Отправить
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
  div.innerHTML += result;
  return div;
}

async function func() {
  let p = await fetch( url, {
    method: "GET",
    mode: "cors",
    credentials: 'omit',
  });
  let result = await p.json();
  const div = document.createElement('div');
  div.className = 'section'
  result.file.product.forEach(element => {
    div.appendChild(productComponent(element.img, element.name, element.price));
  });
  application.appendChild(div);
  application.appendChild(modal());
}

func();




