# Run with command: python3 test_AdHere.py
# Windows:          python test_AdHere.py

import unittest
import AdHere

class TestAdhere(unittest.TestCase):
    
    def test_SanityCheck(self):
        default_target = AdHere.SanityCheck(['AdHere.py'])
        given_target = AdHere.SanityCheck(['AdHere.py', 'targettest.com'])

        self.assertEqual('google.com', default_target)
        self.assertEqual('targettest.com', given_target)

if __name__ == '__main__':
    unittest.main()