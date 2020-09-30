x_content = [];
y_content = [];

fetch(
    'http://api.openweathermap.org/data/2.5/forecast?id=3523127&APPID=256fa912aac28ad19015a6afc64b4157'
)
    .then((response) => response.json())
    .then((response) => {
        lista = response.list;
        for (let i = 0; i < 8; i++) {
            temp = lista[i].main.temp;
            temp = temp - 273.15;
            temp = temp.toFixed(2);

            datetime = lista[i].dt_txt;

            date = datetime.split(' ')[0];
            hour = datetime.split(' ')[1];
            hour = hour.split(':', 2).join(':');
            hour = parseInt(hour);

            if (hour + 21 < 24) hour = hour + 21;
            else hour = hour - 3;

            x_content.push(hour);
            y_content.push(temp);
        }
    })
    .then(() => {
        var ctx = document.getElementById('grafica').getContext('2d');

        console.log(x_content);

        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: x_content,
                datasets: [
                    {
                        label: 'Próximas horas',
                        backgroundColor: '#FFD54F',
                        borderColor: '#827717',
                        data: y_content,
                    },
                ],
            },

            // Configuration options go here
            options: {},
        });
    });
