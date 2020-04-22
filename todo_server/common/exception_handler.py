from rest_framework.exceptions import ErrorDetail
from rest_framework.utils.serializer_helpers import ReturnDict
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc,context)
    response_data = response.data
    custom_response_data = {}
    if type(response_data) is dict:
        custom_response_data['message'] = response_data.pop('detail')
    elif type(response_data) is ReturnDict:
        custom_response_data['errors'] = error_message_standartizition(response_data)
    else:
        custom_response_data = response_data

    response.data = custom_response_data
    return response


def error_message_standartizition(data: dict) -> list:
    errors = []
    for key in data:
        if type(data[key]) is list:
            if any(type(i) is ErrorDetail for i in data[key]):
                errors.append({'field': key, 'message': ''.join(data[key])})
            else:
                for i in data[key]:
                    errors.append({'field': key, 'errors': error_message_standartizition(i)})
        elif type(data[key]) is dict:
            if ('non_field_errors' in data[key]):
                errors.append({'field': key, 'message': ''.join(data[key]['non_field_errors'])})
            else:
                errors.append({
                    'field': key,
                    'errors': error_message_standartizition(data[key])
                })

    return errors
