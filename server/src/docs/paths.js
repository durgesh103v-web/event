/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPayload'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already registered
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthPayload'
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       401:
 *         description: Invalid credentials
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user profile
 *       401:
 *         description: Missing or invalid token
 */

/**
 * @openapi
 * /events:
 *   get:
 *     summary: List events with pagination and search
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50, default: 8 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           enum: [today, week, month, online]
 *     responses:
 *       200:
 *         description: Paginated event list
 *   post:
 *     summary: Create an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 * /events/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string }
 *       description: MongoDB event ID
 *   get:
 *     summary: Get event details
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Event not found
 * /events/{id}/register:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string }
 *       description: MongoDB event ID
 *   post:
 *     summary: Register for an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registered for event
 *       400:
 *         description: Already registered or event is full
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Cancel registration for an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registration cancelled
 *       400:
 *         description: User is not registered
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Event not found
 * /events/{id}/attendees:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string }
 *       description: MongoDB event ID
 *   get:
 *     summary: Get registered attendees for an event
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Registered attendee list
 *       404:
 *         description: Event not found
 */

/**
 * @openapi
 * /registrations/my-events:
 *   get:
 *     summary: Get events registered by the current user
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Events registered by the authenticated user
 *       401:
 *         description: Authentication required
 */
