import os
import mysql.connector
from datetime import datetime, timedelta

# Conectar à base de dados
conn = mysql.connector.connect(
    host=os.environ['DATABASE_URL'].split('@')[1].split('/')[0].split(':')[0],
    user=os.environ['DATABASE_URL'].split('//')[1].split(':')[0],
    password=os.environ['DATABASE_URL'].split(':')[2].split('@')[0],
    database=os.environ['DATABASE_URL'].split('/')[-1].split('?')[0]
)
cursor = conn.cursor()

# Buscar IDs dos ciclos 1-6 (order 1-6)
cursor.execute("SELECT id FROM cycles WHERE `order` BETWEEN 1 AND 6 ORDER BY `order`")
cycle_ids = [row[0] for row in cursor.fetchall()]

print(f"Ciclos encontrados: {cycle_ids}")

# Atualizar datas das aulas ao vivo
base_date = datetime.now()
day_offset = 3

for cycle_idx, cycle_id in enumerate(cycle_ids):
    for week_group in range(1, 5):  # 4 semanas por ciclo
        live_date = base_date + timedelta(days=day_offset)
        
        cursor.execute(
            "UPDATE weeks SET liveDate = %s WHERE cycleId = %s AND weekGroup = %s AND type = 'live' LIMIT 1",
            (live_date, cycle_id, week_group)
        )
        
        rows_affected = cursor.rowcount
        print(f"Ciclo {cycle_idx+1}, Semana {week_group}: {rows_affected} row(s) updated, date: {live_date}")
        
        day_offset += 7  # 7 dias entre aulas

conn.commit()
cursor.close()
conn.close()

print("✅ Datas atualizadas com sucesso!")
