import csv
from pathlib import Path

__all__ = ['csv_reader']


def csv_reader(file_path: Path) -> list[dict]:

    with file_path.open('r', newline='', encoding='utf-8') as csv_file:
        reader = csv.DictReader(csv_file)
        return list(reader)
