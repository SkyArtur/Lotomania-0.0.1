import logging

from celery import shared_task

from core.services import update_contests

__all__ = ['update_contests_task']

logger = logging.getLogger(__name__)


@shared_task(name='core.tasks.update_contests_task')
def update_contests_task() -> dict:
    result = update_contests()

    for contest in result.created:
        logger.info('Concurso %04d importado.', contest.reference)
    for reference, error in result.failed:
        logger.error('Concurso %04d falhou: %s', reference, error)

    return {
        'created': [contest.reference for contest in result.created],
        'failed': result.failed,
    }
