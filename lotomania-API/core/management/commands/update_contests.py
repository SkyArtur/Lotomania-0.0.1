from django.core.management.base import BaseCommand, CommandError

from core.services import update_contests


class Command(BaseCommand):
    help = (
        'Sincroniza os concursos da Lotomania a partir de core/data/lotomania.csv '
        'e atualiza (BetContest, BetResult, BetPrize) as apostas afetadas.'
    )

    def handle(self, *args, **options):
        result = update_contests()

        if not result.created and not result.failed:
            self.stdout.write('Nenhum concurso novo encontrado em lotomania.csv.')
            return

        for contest in result.created:
            self.stdout.write(self.style.SUCCESS(f'Concurso {contest.reference:04d} importado.'))

        if result.failed:
            for reference, error in result.failed:
                self.stderr.write(self.style.ERROR(f'Concurso {reference:04d} falhou: {error}'))
            raise CommandError(f'{len(result.failed)} concurso(s) falharam ao importar.')
