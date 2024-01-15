# import pandas as pd
import ast
import csv
import requests
import json
import boto3


def lambda_handler(event, context):
    PROD=False # Change to True when deployed on AWS Lambda
    if PROD:
        ingr = event["body"]
        ingr = json.loads(event)
        ingr = ingr["ingredients"]

        s3 = boto3.client('s3')
        response = s3.get_object(Bucket='hack-recipes', Key="subdataset.csv")
        csv_data = response['Body'].read().decode('utf-8')
        # response = requests.get("https://hack-recipes.s3.us-east-2.amazonaws.com/subdataset.csv?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMSJIMEYCIQDuRYBw8f%2F8OTvNa0ktCTCwVxUyNr6KDGHDaFetV40LFQIhAKZmyRfJI2gtUJF1ytcAUdDI4vQd6Epu4b5Y3%2BV6C2kAKuQCCHQQABoMMjY2MDkxMTI2MTg5IgymdDMcVnPyAQ33vxwqwQKUGofGFciipNCmpefMKLrIeyDuVmI7MkCgcFxs55Zthqf83DC2SEO0eQYRS%2BBRv%2BjRnqt%2BLTbDzODXd6dWLWWePlhwmYkbpq0lE6xF7wpoIaoCzU44PfHsmhYFP9nP%2FGu3uvePwha7sEMBPg%2BwnQhZ6rz6rCKp5Lk32cj3x37mnuUkhfhjwVWQB3WW4lsGH%2FMMZo1PFSAg46NQycizHjb14LcA0OFEIIk9e4KowkdnYr%2FPthTKjtkrU%2FSO9ZmoTqIK0CFjBHYKSej9dMrdJZzCyQpsMrEYBy9BjmFaIzAOrYWRQiyTz3eBAoPyNN6sIm3qX%2B9vs544hiX4ENEaW58VVMfAqdg0ZaOcc2obUd7Wx30yJDj0l7Gw9FZSE%2FSrKI91hkOhe5lCBpcGf7hvC8fwK1jnvnGq6xDq3XU2%2F427UJwwjOqdqgY6sgKOflpwYKsxfDmWy5d90Vh1ryx9hkg3vnGilNjA%2Fz0fA2hIRG2y1X2YvgZKNJvBOyw3pAO2%2FsjtHxqgDu11a%2FbWh%2F6wKGslkk1rV2JayO8IsJrpPObTwvFNzZ75O9dNtcEnLvSjc%2BJhwzK476RJyk%2BwiJ3tmMtJkGh056yu0ejYIiwN0Q%2FP668j7r3qwxVXzdZVgTBfMCLDAKmeP5dU%2BsGhpTkwbaz%2FetQ9VrNJ%2FaxMpwz5LP04edVqx4rYeyNbInSomg4LYHE1dxZc%2B7xqfITkVktPJ2vzKJpEx4KrrLFroHhsIhdqFZdTsxLZ1Bot80V7u4w6Jm%2FIjwofN04NckwV%2FLno0sSYemQb2CuhTFRQYPz1PQ1ef%2BOTiEikcpksuPrg1ZHLL%2BC2wVj7o7cJtDi%2Bf1Y%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231105T172656Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAT35CELWWWD224NGG%2F20231105%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=0bbfb5305a444774c8f0cf2b9beda0a0b4c2b4702d725bdfa50b64bb1980f0e6")
        # csv_data=""
        # if response.status_code == 200:
        #     # Parse the CSV data from the response content
        #     csv_data = response.text
    else:
        ingr = [
        "milk",
        "eggs",
        "chicken",
        "lemon",
        "orange",
        "sugar",
        "pecans",
        "peanut butter"
        ]
        with open("subdataset.csv") as f:
            csv_data = f.read()
    res = recommendations(ingr, csv_data)
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps(res)
    }

def recommendations(ingredients, data):
    recipes = csv.reader(data.splitlines())
    ingredients = [ingredient.rstrip("s") for ingredient in ingredients]
    res = {}
    headers = next(recipes, None) 
    for row in recipes:
        # print(row)
        ingr_list = ast.literal_eval(row[6])
        ingr_list = [ingredient.rstrip("s") for ingredient in ingr_list]
        missing = set(ingr_list).difference(set(ingredients))
        # print(missing)
        if len(missing) <=2:
            # print("found")
            res[row[0]] = {
                "type": row[1],
                "calories": int(row[2]),
                "fat": int(row[3]),
                "carb": int(row[4]),
                "protein": int(row[5]),
                "ingredients": ast.literal_eval(row[6]),
                "quantity": ast.literal_eval(row[8]),
                "unit": ast.literal_eval(row[7]),
                "link": row[9],
                "recipe": ast.literal_eval(row[10]),
                "missing": list(missing)
            }
        
    return res
# r = recommendations(["milk","eggs", "chicken","lemon","orange","sugar", "pecans", "peanut butter"])
# r = pd.DataFrame(r)
# print(r)
