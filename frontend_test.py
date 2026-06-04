import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto('http://localhost:3000')
    time.sleep(2)

    # Try advanced mode to view Motif Library
    try:
        page.click("text=Advanced")
        time.sleep(1)

        # Click Motifs tab
        page.click("text=Motifs")
        time.sleep(1)

        page.screenshot(path='motif_library.png')
    except Exception as e:
        print("Error accessing Motifs:", e)

    page.close()
    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
