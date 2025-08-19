#!/usr/bin/env python3
"""Test script to verify the like system is working correctly"""

import requests
import json

def test_like_system():
    base_url = "http://localhost:5000"
    
    print("=== TESTANDO SISTEMA DE CURTIDAS ===")
    
    # Test 1: Try to like without login (should fail)
    print("\n1. Testando curtida sem login:")
    response = requests.post(f"{base_url}/like/1")
    print(f"Status: {response.status_code}")
    if response.headers.get('content-type', '').startswith('application/json'):
        data = response.json()
        print(f"Resposta: {data}")
    
    # Test 2: Login first
    print("\n2. Fazendo login:")
    login_data = {
        'email': 'raicarvalho343@gmail.com',
        'password': 'rai123100'
    }
    
    # Create session
    session = requests.Session()
    
    # Get login page first to get the form
    login_page = session.get(f"{base_url}/login")
    print(f"Login page status: {login_page.status_code}")
    
    # Post login
    login_response = session.post(f"{base_url}/login", data=login_data)
    print(f"Login response status: {login_response.status_code}")
    
    # Test 3: Try to like after login
    print("\n3. Testando curtida após login:")
    like_response = session.post(f"{base_url}/like/1")
    print(f"Like status: {like_response.status_code}")
    if like_response.headers.get('content-type', '').startswith('application/json'):
        like_data = like_response.json()
        print(f"Like resposta: {like_data}")
    
    # Test 4: Test toggle (like again to unlike)
    print("\n4. Testando toggle (curtir novamente para descurtir):")
    toggle_response = session.post(f"{base_url}/like/1")
    print(f"Toggle status: {toggle_response.status_code}")
    if toggle_response.headers.get('content-type', '').startswith('application/json'):
        toggle_data = toggle_response.json()
        print(f"Toggle resposta: {toggle_data}")
    
    print("\n=== TESTE CONCLUÍDO ===")

if __name__ == "__main__":
    test_like_system()